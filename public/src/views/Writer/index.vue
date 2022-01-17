<template>
  <div class="writer">
    <h1 class="site-title">{{ name }}</h1>
    <div class="writer-content">
      <img class="writer_pic" :src="require(`@/uploads/${imagePath}`)" />
      <p>{{ bio }}</p>
      <img
        class="writer_social_icons"
        v-for="social in socials"
        :key="social.url"
        :src="getLogoSrc(social.url)"
        @click="redirectExternal(social.url)"
      />
    </div>
  </div>
</template>

<script src="./writer.ts"></script>
<style src="./writer.scss" lang="scss"></style>
