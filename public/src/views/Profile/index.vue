<template>
  <div class="profile">
    <div
      v-if="!getIsLoggedIn"
      class="profile_not_logged_in white_card_background "
    >
      <p
        v-if="!getIsLoggedIn || getLoggedInPlayer == {}"
        @click="redirect('/login')"
      >
        Sign in to view your profile
      </p>
    </div>
    <div v-if="getIsLoggedIn">
      <h1 class="site-title">Your Profile</h1>
      <div class="profile-info">
        <h3>{{ getLoggedInPlayer.name }}</h3>
        <p>{{ getLoggedInPlayer.bio }}</p>
        <div class="user-inputs">
          <input
            v-for="field in fields"
            :key="field.name"
            :placeholder="field.placeholder"
            :disabled="!isSettingsEditing"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./profile.ts"></script>
<style src="./profile.scss" lang="scss"></style>
