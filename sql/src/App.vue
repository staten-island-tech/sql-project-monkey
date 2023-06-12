


<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <div class="login">
            <RouterLink class="router" v-if="!loggedin" to="/login">Login</RouterLink>
          </div>
          <div class="logout">
            <button v-if="loggedin" @click="logOut">Log Out</button>
          </div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/cart" @click="checkUser">Cart </RouterLink>
        <RouterLink to="/cart" @click="checkUser">Orders</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView @loggedin="login" />
</template>


<script>
import { authStore } from './stores/counter'
import { RouterLink, RouterView } from 'vue-router'
export default {
  methods: {
    logOut: function () {
      authStore().clearUser()
      router.push('home')
      this.loggedin = false
    },
    login: function () {
      this.loggedin = true
    }
  },
  data() {
    return {
      loggedin: false
    }
  }
}
</script>


<style>
</style>
