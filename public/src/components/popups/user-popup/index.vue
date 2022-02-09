<template>
  <div class="user-popup-container">
    <div class="user-popup-container_arrow" :class="alignment"></div>
    <div
      class="user-popup-container_links"
      :class="{ 'center-content': !getIsLoggedIn }"
    >
      <div v-if="getIsLoggedIn" class="logged_in_links">
        <div class="link" @click="redirectLink('/profile')">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'user-circle']"
          ></font-awesome-icon>
          <p>My profile</p>
        </div>
        <div class="link" @click="redirectLink('/request-access')">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'pen']"
          ></font-awesome-icon>
          <p>Request Access</p>
        </div>
        <div
          v-if="getLoggedInUser.access_level >= 10"
          class="link"
          @click="redirectLink('/create-post')"
        >
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'pen']"
          ></font-awesome-icon>
          <p>Create Post</p>
        </div>
        <div
          v-if="getLoggedInUser.access_level >= 20"
          class="link"
          @click="redirectLink('/admin')"
        >
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'lock-open']"
          ></font-awesome-icon>
          <p>Admin Panel</p>
        </div>
        <div class="link" @click="redirectLink('/logout')">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'sign-out-alt']"
          ></font-awesome-icon>
          <p>Sign out</p>
        </div>
      </div>
      <div v-else-if="!getIsLoggedIn" class="not_logged_in_links">
        <p class="logged-out-text">You're not currently logged in</p>
        <button class="btn red_btn" @click="redirectLink('/signup')">
          Sign up
        </button>
        <button class="btn red_btn" @click="redirectLink('/login')">
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./user-popup.ts"></script>
<style src="./user-popup.scss" lang="scss"></style>
