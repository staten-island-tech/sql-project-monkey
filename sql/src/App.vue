<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <div class="Links">
            <RouterLink class="router" to="/">Home</RouterLink>
            <RouterLink class="router" to="/">Monkeys</RouterLink>
            <RouterLink class="router" to="/">Shopping Cart</RouterLink>
            <RouterLink class="router" to="/">Cart</RouterLink>
            <RouterLink class="router" to="/">Orders</RouterLink>
          </div>
          <div class="login">
            <button v-if="loggedin" @click="logOut">Log Out</button>
          </div>
        </nav>
      </div>
    </header>
    <RouterView @loggedin="login" />
  </div>
</template>

<script>
import { authStore } from './stores/counter'
import { RouterLink, RouterView } from 'vue-router'
export default {
  methods: {
    logOut: function () {
      authStore().clearUser()
      router.push('login')
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

<style></style>
