<template>

  <header class="bg-brand-main w-full flex justify-center" style="height: 700px;">
    <div class="flex flex-col w-4/5 max-w-6xl header-group">

      <div class="flex items-center justify-between py-10">

        <div class="w-28 lg:w-36">
          <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
        </div>

        <div class="flex">
          <button id="header-create-account-button" class="px-6 py-2 font-bold rounded-full text-white focus:outline-none" @click="() => emit('create-account')">
            Crie uma conta
          </button>
          <button id="login-button" class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none" @click="() => emit('login')">
            Entrar
          </button>
        </div>

        </div>

        <div class="flex flex-col mt-28">
          <h1 class="text-4xl font-black text-white">
            Tenha um feedback . <br>
            E faça seus clientes mais felizes <br class="hiden lg:inline-block">
          </h1>
          <p class="text-lg font-medium text-white">
            Receba ideias, reclamações e feedbacks com um <br class="hiden lg:inline-block">
            simples widget na página.
          </p>
        </div>
        <div>
          <button @click="() => emit('create-account')" id="cta-create-account-button" class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none">
            Crie uma conta grátis
          </button>
        </div>

    </div>
  </header>

</template>

<script>
export default {
  setup(_, {emit}) {
    return {emit}
  }
}
</script>

<style scoped>

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}

</style>
