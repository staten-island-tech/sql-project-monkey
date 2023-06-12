<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <a
    ><RouterLink to="/home"
      ><button class="back"><i class="fa fa-home"></i></button></RouterLink
  ></a>
  <div class="login">
    <h1>Login</h1>
    <form>
      <div class="loginForm">
        <h2 class="text">Email</h2>
        <div class="email">
          <input type="email" id="email" />
        </div>
        <h2 class="text">Password</h2>
        <div class="password">
          <input type="password" id="password" />
        </div>
        <input type="submit" value="Log In" id="login" @click="login" />
      </div>
    </form>
    <div class="toSignUp">
      Don't have an account?<a><RouterLink to="/signup"> Sign Up Here</RouterLink></a>
    </div>
  </div>
</template>

<script>
import { authStore } from '../stores/counter.js'
import { supabase } from '../supabase'
import router from '../router'
import { RouterLink } from 'vue-router'

async function signIn(supabase, userEmail, userPassword) {
  try {
    await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword
    })
    let {
      data: { user }
    } = await supabase.auth.getUser()
    authStore().loadUser(user.id)
    router.push('home')
  } catch (error) {
    alert('Please check your credentials')
 console.error(error)
  }
}

export default {
  methods: {
    async login(a) {
      a.preventDefault()
      let userEmail = document.getElementById('email').value
      let userPassword = document.getElementById('password').value
      if (userEmail === '' || userPassword === '') {
        alert('Please fill out all fields')
      } else {
        signIn(supabase, userEmail, userPassword)
      }
      this.$emit('loggedin')
    },
    emits: ['loggedin'],
  }
}
</script>

<style>
.text {
  margin-top: 1rem;
}
#login {
  margin-top: 1rem;
}
</style>
