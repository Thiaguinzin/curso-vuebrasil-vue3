/* eslint-disable */

<template>
  <custom-header
    @create-account="handlerAccountCreate"
    @login="handlerLogin"
  />
  <contact/>

  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800"> feedbackers © 2024 </p>
  </div>

</template>

<script>
import { onMounted, vModelRadio } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import useModal from '../../hooks/useModal'

export default {
  components: { CustomHeader, Contact },

  setup() {

    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')

      if (token) {
        router.push({name: 'Feedbacks'})
      }

    })

    function handlerLogin(){
      modal.open({
        component: 'ModalLogin'
      })

    }

    function handlerAccountCreate(){
      modal.open({
        component: 'ModalCreateAccount'
      })
    }

    return {
      handlerLogin,
      handlerAccountCreate
    }

  }

}

</script>
<style>
</style>
