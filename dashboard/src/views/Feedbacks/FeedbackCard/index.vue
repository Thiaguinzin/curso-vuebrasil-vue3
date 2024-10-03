<template>
  <div @click="handlerToggle" class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray">

    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type"/>
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium tex-gray-800">
      {{ feedback.text }}
    </div>

    <div class="flex mt-8 animate__animated animate__fadeInUp animate__faster" :class="{animate__fadeOutUp: state.isClosing}" v-if="state.isOpen">

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercarse select-none"> Página </span>
          <span class="font-bold text-gray-700 uppercarse select-none"> {{ feedback.page }} </span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercarse select-none"> Dispositivo </span>
          <span class="font-bold text-gray-700 uppercarse select-none"> {{ feedback.device }} </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercarse select-none"> Usuário </span>
          <span class="font-bold text-gray-700 uppercarse select-none"> {{ feedback.fingerprint }} </span>
        </div>
      </div>

    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <icon name="chevron-down" size="24" :color="brandColors.graydark"></icon>
    </div>

  </div>
</template>

<script>
import Badge from './Badge'
import { getDiffTimeBetweenCurrentDate } from '../../../utils/date'
import state from '@/store/user';
import palette from '../../../../palette'
import { reactive } from 'vue';
import Icon from '../../../components/Icon'
import { wait } from '../../../utils/timeout'

export default {
  components: { Badge, Icon },
  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true },
  },

  setup(props) {

    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handlerToggle() {
      state.isClosing = true
      await wait(250);
      state.isOpen = !state.isOpen
      state.isClosing = false
    }


    return {
      state,
      handlerToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>
