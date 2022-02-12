<template>
  <div class="writer-card-container">
    <div class="writer-card-admin">
      <img :src="imageSrc" />
      <div class="rhs">
        <h1 @click="redirect('/users/' + writerID)">{{ name }}</h1>
        <p>
          {{ bio }}
        </p>
        <div class="socials">
          <i
            v-for="social in socialsWithClass"
            :key="social.url"
            :class="social.class"
            @click="redirectExternal(social.url)"
          ></i>
        </div>
      </div>
    </div>
    <input
      :disabled="!isAccessEditing"
      type="number"
      v-model="newAccessLevel"
      class="default-input"
    />
    <button v-if="!isAccessEditing" class="btn" @click="editAccess">
      Edit
    </button>
    <button v-if="isAccessEditing" class="btn" @click="saveAccess">
      Save
    </button>
    <button v-if="isAccessEditing" class="btn" @click="cancelAccess">
      Cancel
    </button>
  </div>
</template>

<script src="./writer-card-admin.ts"></script>
<style src="./writer-card-admin.scss" lang="scss"></style>
