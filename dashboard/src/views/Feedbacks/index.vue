<template>

  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged/>
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800"> Feedbakcs </h1>
    <p class="text-lg text-center text-gray-800 font-regular"> Detalhes de todos os feedbacks recebidos </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">

      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h1>
        <suspense>
          <template #default>
            <filters @select="changeFeedbacksType" class="mt-8 animate__animated animate__fadeIn animate__faster"/>
          </template>
          <template #fallback>
            <filters-loading class="mt-8"/>
          </template>
        </suspense>
      </div>

      <div class="px-10 pt-20 col-span-3">
        <p v-if="state.hasError" class="text-lg text-center text-gray-800 font-regular"> Aconteceu um erro ao carregar os feedbacks </p>
        <p v-if="state.feedbacks.length === 0 && !state.isLoading" class="text-lg text-center text-gray-800 font-regular"> Ainda nenhum feedback recebido </p>

        <feedback-card-loading v-if="state.isLoading || state.isLoadingFeedbacks"/>
        <feedback-card v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks"/>

      </div>

    </div>
  </div>

</template>

<script>
import Filters from './Filters'
import HeaderLogged from '../../components/HeaderLogged'
import FiltersLoading from './FiltersLoading'
import ContentLoader from '../../components/ContentLoader'
import Icon from '../../components/Icon'
import services from '../../services'
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue'
import FeedbackCard from './FeedbackCard'
import FeedbackCardLoading from './FeedbackCard/Loading'

export default {
  components: { ContentLoader, Icon, Filters, FiltersLoading, FeedbackCard, FeedbackCardLoading, HeaderLogged },

  setup() {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      feedbacks: [],
      hasError: false,
    })

    onErrorCaptured(handlerErrors)

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    async function handleScroll() {
      const isBottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight

      if (state.isLoading || state.isLoadingMoreFeedbacks) return
      if(!isBottomOfWindow) return
      if(state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedbacks = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.isLoadingMoreFeedbacks = false
        state.pagination = data.pagination

      } catch (error) {
        state.isLoadingMoreFeedbacks = false
        handlerErrors(error)
      }
    }

    function handlerErrors(error) {
      state.isLoading = false
      state.isLoadingFeedbacks = false
      state.hasError = !!error;
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false

      } catch (error) {
        handlerErrors(error)
      }
    }

    async function changeFeedbacksType(type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.offset = 0
        state.pagination.limit = 5
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false

      } catch (error) {
        handlerErrors(error)
      }
    }

    return {
      state,
      handlerErrors,
      changeFeedbacksType
    }
  }
}
</script>
