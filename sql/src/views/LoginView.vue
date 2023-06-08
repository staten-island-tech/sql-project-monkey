<template>
  <a><button class="back">Back</button></a>
  <h1>Login</h1>
  <div class="loginForm">
    <div class="email">
      <input type="email" placeholder="Email" id="email" />
    </div>
    <div class="password">
      <input type="password" placeholder="Password" id="password" />
    </div>
    <input type="submit" value="Log In" id="login" @click="Login" />
  </div>
  <div class="toSignUp">
    Don't have an account?
    <a><RouterLink to="/signUp">Sign Up Here</RouterLink></a>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const handleSignin = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value
        })
        if (error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      }
    }

    return {
      email,
      password,
      handleSignin
    }
  }
}
</script>

<style>
.button {
}
</style>
