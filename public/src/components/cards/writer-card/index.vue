<template>
  <div class="writer-card">
    <img :src="require(`@/uploads/${imagePath}`)" />
    <div class="rhs">
      <h1>{{ name }}</h1>
      <h5>
        {{ bio }}
      </h5>
      <img
        v-for="social in socials"
        :key="social.url"
        :src="getLogoSrc(social.url)"
        @click="redirectExternal(social.url)"
      />
    </div>
  </div>
</template>

<script src="./writer-card.ts"></script>
<style src="./writer-card.scss" lang="scss"></style>
