<template>
  <header>

    <div class="wrapper">
      <nav>
        <div class="left"> 
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/monkeys">Monkeys</RouterLink>
        <RouterLink to="/cart" @click="checkUser">Cart </RouterLink>
        <RouterLink to="/order" @click="checkUser">Orders</RouterLink>
      </div>

      <div class="right">
        <RouterLink class="router" v-if="!loggedin" to="/login">Login</RouterLink>
          <button v-if="loggedin" @click="logOut">Log Out</button>
      </div>
       
    
      </nav>
    </div>
  </header>

  <RouterView @loggedin="login" />
</template>

<script>
import { authStore } from './stores/counter'
import { RouterLink, RouterView } from 'vue-router'
import router from './router/index.js'
export default {
  methods: {
    logOut: function () {
      authStore().clearUser()
      router.push('/')
      this.loggedin = false
    },
    login: function () {
      this.loggedin = true
    },
    checkUser: function () {
      if (authStore().currentUser === null) {
        router.push('login')
      }
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
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: black;
}

nav a {
  display: inline-block;
  padding: 1rem;
  border-left: 2.5px solid var(--color-border);
}

.left {
  margin-left: 5rem;
  color: black;
}
.right {
  margin-right: 5rem;
}

nav a:first-of-type {
  border: 0;
}

nav:hover .router {
  color: #575757;
}
nav:hover .router:hover {
  color: white;
  box-shadow: 0 2px 0 0 currentColor;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
button {
  margin-top: 1rem;
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  max-width: none;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
}
button:hover,
button:focus {
  opacity: 0.75;
}
</style>