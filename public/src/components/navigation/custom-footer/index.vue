<template>
  <div class="footer-container">
    <div class="footer-margin"></div>
    <div class="flex-container">
      <div class="logo">
        <img :src="getInvertedLogo" />
      </div>
      <div class="rhs">
        <div class="links">
          <p class="link" @click="redirect('top')">Top</p>
          <p class="link" @click="redirect('writers')">Writers</p>
          <p class="link" @click="redirect('/')">Home</p>
          <i
            @click="redirectExternal('https://twitter.com/thenatiking')"
            class="fab fa-twitter-square fa-2x"
          ></i>
        </div>
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
