<template>
  <div class="default-card default-width post-card">
    <img :src="imageSrc" />
    <div class="rhs">
      <h1 class="h1-heading">{{ title }}</h1>
      <h5>
        By: {{ authorName }} | {{ commentAmt }} comment(s) |
        {{ likeAmt }} like(s)
      </h5>
      <div class="tags">
        <p v-for="tag in tags" :key="tag.name">
          {{ tag }}
        </p>
      </div>
    </div>
  </div>
</template>

<script src="./post-card.ts"></script>
<style src="./post-card.scss" lang="scss"></style>
