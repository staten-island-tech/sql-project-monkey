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
  <div class="signUp">
    <h1 class="title">Sign Up</h1>
    <form class="signUpForm">
      <h2 class="text">Email</h2>
      <div class="email">
        <input type="email" id="email" :rules="emailRules" />
      </div>
      <h2 class="text">Password</h2>
      <div class="password">
        <input type="password" id="password" />
      </div>
      <h2 class="text">Re-enter Password</h2>
      <div class="password">
        <input type="password" id="confirm" />
      </div>
      <input type="submit" value="Sign Up" id="submit" @click="signup" />
    </form>
    <div class="login">
      Already have an account? <a><RouterLink to="/login">Login here</RouterLink></a>
    </div>
  </div>
</template>

<script>
import { authStore } from '../stores/counter'
import { supabase } from '../supabase'
import router from '../router'

async function signUp(supabase, userEmail, userPassword) {
  try {
    await supabase.auth.signUp({
      email: userEmail,
      password: userPassword
    })
    await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword
    })
    let {
      data: { user }
    } = await supabase.auth.getUser()
    await supabase.from('logins').insert([{ user_id: user.id, email: userEmail }])
  } catch (error) {}
}

export default {
  methods: {
    async signup(e) {
      const emailCheck = await supabase.from('').select().eq('email', this.email)
      e.preventDefault()
      let userEmail = document.getElementById('email').value
      let userPassword = document.getElementById('password').value
      let confirmed = document.getElementById('confirm').value
      if (userEmail === '' || userPassword === '' || confirmed === '') {
        alert('Please fill out all fields')
      } else if (userPassword != confirmed) {
        alert('Your confirmed password does not match')
      } else if (userPassword.length <= 5) {
        alert('Password must contain at least 6 charaters')
      } else if (emailCheck.data.length > 0) {
        alert('This email is already in use or is not real')
      } else {
        signUp(supabase, userEmail, confirmed)
        authStore()
        router.push('login')
      }
    }
  }
}
</script>

<style>
.title {
  font-size: 3rem;
}
.text {
  margin-top: 1rem;
}
#submit {
  margin-top: 1rem;
}
</style>
