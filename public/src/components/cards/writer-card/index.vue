<template>
  <div class="writer-card">
    <img :src="require(`@/uploads/${imagePath}`)" />
    <div class="rhs">
      <h1 @click="redirect('/writers/' + writerID)">{{ name }}</h1>
      <h5>
        {{ bio }}
      </h5>
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
