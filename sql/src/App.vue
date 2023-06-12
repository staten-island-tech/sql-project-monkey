<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <div class="login">
            <RouterLink class="router" v-if="!loggedin" to="/login">Login</RouterLink>
          </div>
          <div class="logout">
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

<style></style>
