<template>
  <div class="signUp">
    <h1 class="title">Sign Up</h1>
    <form class="signUpForm">
      <h2 class="text">Email</h2>
      <div class="email">
        <input type="email" id="email" :rules="emailRules" />
      </div>
      <h2 class="text">Password</h2>
      <div class="password">
        <input
          type="password"
          id="password"
          :rules="passwordRules"
          :type="passwordShow ? 'text' : 'password'"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow = !passwordShow"
          required
        />
      </div>
      <h2 class="text">Re-enter Password</h2>
      <div class="password">
        <input type="password" id="password-confirm" />
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
  data: () => ({
    loading: false,
    passwordShow: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Password must be 6  characters or more!'
    ]
  }),
  methods: {
    async signup(a) {
      a.preventDefault()

      let userEmail = document.getElementById('email').value
      let userPassword = document.getElementById('password').value
      let userPasswordConfirmed = document.getElementById('password-confirm').value

      if (userEmail === '' || userPassword === '') {
        console.error('error')
      } else {
        signUp(supabase, userEmail, userPasswordConfirmed)
        authStore()
        router.push('loginpage')
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
