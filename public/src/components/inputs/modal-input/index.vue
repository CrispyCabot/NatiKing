<template>
  <div class="modal-input" @click="focusInput">
    <img :src="getLogoSrc(url)" @click="redirectExternal(url)" />
    <font-awesome-icon
      v-if="isEditing"
      class="x-icon"
      :icon="['fas', 'times-circle']"
      @click="removeSocial(url)"
    ></font-awesome-icon>
  </div>
</template>

<script src="./modal-input.ts"></script>
<style src="./modal-input.scss" lang="scss"></style>
