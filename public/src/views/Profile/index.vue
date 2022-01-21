<template>
  <div class="profile">
    <div v-if="!getIsLoggedIn" class="profile_not_logged_in">
      <p
        v-if="!getIsLoggedIn || getLoggedInUser == {}"
        @click="redirect('/login')"
      >
        Sign in to view your profile
      </p>
    </div>

    <div v-if="getIsLoggedIn">
      <h1 class="site-title">Your Profile</h1>
      <div class="profile-info">
        <h3>{{ getLoggedInUser.name }}</h3>
        <p>{{ getLoggedInUser.bio }}</p>
        <content-dropdown
          class="settings"
          :label="'Settings'"
          :iconClass="'fas cog'"
        >
          <div class="user-inputs">
            <br />
            <input
              v-for="field in fields"
              :key="field.name"
              :placeholder="field.placeholder"
              :disabled="!isSettingsEditing"
            />
          </div>
        </content-dropdown>
      </div>
    </div>
  </div>
</template>

<script src="./profile.ts"></script>
<style src="./profile.scss" lang="scss"></style>
