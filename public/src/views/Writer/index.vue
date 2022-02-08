<template>
  <div class="writer">
    <h1 class="site-title">{{ name }}</h1>
    <div class="writer-content">
      <img class="writer_pic" :src="imageSrc" />
      <p>{{ bio }}</p>
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
</template>

<script src="./writer.ts"></script>
<style src="./writer.scss" lang="scss"></style>
