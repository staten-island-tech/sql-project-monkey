<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <a
    ><button class="back"><i class="fa fa-home"></i></button
  ></a>
  <h1>Login</h1>
  <form>
    <div class="loginForm">
      <div class="email">
        <input type="email" placeholder="Email" id="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Password" id="password" />
      </div>
      <input type="submit" value="Log In" id="login" @click="Login" />
    </div>
  </form>
  <div class="toSignUp">
    Don't have an account?
    <a><RouterLink to="/signup">Sign Up Here</RouterLink></a>
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
