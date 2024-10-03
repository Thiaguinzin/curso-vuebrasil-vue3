<template>

  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged/>
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800"> Credenciais </h1>
    <p class="text-lg text-center text-gray-800 font-regular"> Guia de instalação e geração de suas credenciais </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w4/5 max-w-6xl py-10">

      <h1 class="text-3xl font-black text-brand-darkgray">Instalação e configuração</h1>

      <p class="mt-10 text-lg text-gray-800 font-regular"> Este aqui é a sua chave de api </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div v-else class="flex py-3 pl-5 pr-20 mt-2 justify-between rounded items-center bg-brand-gray w-full lg:w-1/2">
        <span v-if="state.hasError"> Erro ao carregar a ApiKey </span>
        <span id="api-key" v-else> {{ store.User.currentUser.apiKey }} </span>
        <div class="flex ml-20 mr-1" v-if="!state.hasError">
          <icon @click="handlerCopy" name="copy" :color="brandColors.graydark" size="24" class="cursor-pointer"/>
          <icon id="generate-apiKey" @click="handlerGenerateApiKey" name="loading" :color="brandColors.graydark" size="24" class="cursor-pointer ml-3"/>
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular"> Coloque o script abaixo no seu site para começar a receber feedbacks </p>

      <content-loader
      v-if="store.Global.isLoading || state.isLoading"
      class="rounded"
      width="600px"
      height="50px"
      />

      <div v-else class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
        <span v-if="state.hasError"> Erro ao carregar o script </span>
        <pre v-else>&lt;script src="https://Thiaguinzin-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}&gt;&lt;/script&gt;"</pre>
      </div>

    </div>
  </div>

</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import Icon from '../../components/Icon'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'

export default {
  components: { ContentLoader, HeaderLogged, Icon },

  setup() {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handlerError(true);
      }
    })

    function handlerError(error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function handlerGenerateApiKey() {
      try {

        state.isLoading = true;
        const { data } = await services.users.generateApiKey()
        console.log('data')
        console.log(data)
        setApiKey(data.apiKey)

        state.isLoading = false;

      } catch (error) {
        handlerError(error)
      }
    }

    async function handlerCopy() {
      toast.clear()

      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey);
        toast.success('Copiado!')
      } catch (error) {
        handlerError(error)
      }
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      handlerGenerateApiKey,
      handlerCopy,
    }
  }
}
</script>

<style>

</style>
