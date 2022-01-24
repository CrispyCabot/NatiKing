<template>
  <div class="social-input" @click="focusInput">
    <img :src="getLogoSrc(url)" @click="redirectExternal(url)" />
    <font-awesome-icon
      v-if="isEditing"
      class="x-icon"
      :icon="['fas', 'times-circle']"
    ></font-awesome-icon>
  </div>
</template>

<script src="./social-input.ts"></script>
<style src="./social-input.scss" lang="scss"></style>
