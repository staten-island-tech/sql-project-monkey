<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  methods: {
    checkUser: function () {
      if (authStore().currentUser === null) {
        router.push('login')
      }
    }
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/cart" @click="checkUser">Cart </RouterLink>
        <RouterLink to="/cart" @click="checkUser">Orders</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
