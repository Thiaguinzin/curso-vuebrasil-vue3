<template>
  <modal-factory/>
  <router-view/>
</template>

<script>
import { watch } from 'vue'
import ModalFactory from './components/ModalFactory'
import { useRoute, useRouter } from 'vue-router'
import services from './services'
import { setCurrentUser } from './store/user';

export default {
  components: {ModalFactory},

  setup() {

    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async() => {

      if (route.meta.hasAuth) {
        console.log('caiu aqui')
        const token = window.localStorage.getItem('token')
        console.log(token)

        if (!token) {
          router.push({name: 'Home'})
          return
        }

        const { data } = await services.users.getMe()
        setCurrentUser(data)

      }

    })

  }


}
</script>
