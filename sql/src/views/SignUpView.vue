<template>
  <div class="signUp">
    <h1>Sign Up</h1>
    <form class="signUpForm">
      <h2 class="text">Email</h2>
      <div class="email">
        <input type="email" id="email" />
      </div>
      <h2 class="text">Password</h2>
      <div class="password">
        <input type="password" placeholder="At least 6 characters" id="password" />
      </div>
      <h2 class="text">Re-enter Password</h2>
      <div class="password">
        <input type="password" id="password-confirm" />
      </div>

      <input type="submit" value="Sign Up" id="signup" @click="signup" />
    </form>
    <div class="login">
      Already have an account? <a><RouterLink to="/login">Login</RouterLink></a>
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
