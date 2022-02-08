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
        <img :src="imageSrc" />
        <h3>{{ name }}</h3>
        <p>{{ bio }}</p>
        <div class="socials">
          <SocialInput
            class="social"
            v-for="social in getLoggedInUser.socials"
            :key="social.url"
            :url="social.url"
            :isEditing="isSettingsEditing"
          />
          <font-awesome-icon
            v-if="isSettingsEditing"
            class="plus-icon"
            :icon="['fas', 'plus-circle']"
            @click="openSocialPopup()"
          ></font-awesome-icon>
        </div>
        <ModalInput
          :showModal="isShowingModal"
          :title="'Add a Social Link'"
          :prompt="'Enter the url:'"
          :name="'socialURLInput'"
          :type="'text'"
          @clicked="addNewSocial"
        />
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
              :name="field.name"
              :type="field.type"
              v-model="field.value"
            />
          </div>

          <button v-if="!isSettingsEditing" class="btn" @click="editSettings">
            Edit
          </button>
          <p v-if="isSettingsEditing">
            Use the green plus above to add social media accounts!
          </p>
          <p v-if="isSettingsEditing">
            Tip: Copy the image address of your twitter account's profile
            picture and paste it into the profile pic url above.
          </p>
          <button v-if="isSettingsEditing" class="btn" @click="saveSettings">
            Save
          </button>
          <button v-if="isSettingsEditing" class="btn" @click="cancelSettings">
            Cancel
          </button>
        </content-dropdown>
      </div>
    </div>
  </div>
</template>

<script src="./profile.ts"></script>
<style src="./profile.scss" lang="scss"></style>
