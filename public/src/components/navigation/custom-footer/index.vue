<template>
  <div class="footer-container">
    <div class="footer-margin"></div>
    <div class="flex-container">
      <div class="logo">
        <img :src="getLogo" />
      </div>
      <div class="rhs">
        <p>footer here</p>
      </div>
      <div v-if="!getIsLoggedIn" class="login-signup-links">
        <p class="link" @click="redirect('/login')">Log In</p>
        <p class="link" @click="redirect('/signup')">Sign Up</p>
      </div>
    </div>
  </div>
</template>

<script src="./custom-footer.ts"></script>
<style src="./custom-footer.scss" lang="scss"></style>
