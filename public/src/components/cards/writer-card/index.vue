<template>
  <div class="writer-card">
    <img :src="imageSrc" />
    <div class="rhs">
      <h1 class="h1-heading" @click="redirect('/users/' + writerID)">
        {{ name }}
      </h1>
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
</template>

<script src="./writer-card.ts"></script>
<style src="./writer-card.scss" lang="scss"></style>
