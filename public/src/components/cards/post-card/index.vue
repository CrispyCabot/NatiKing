<template>
  <div class="post-card">
    <img :src="require(`@/uploads/${imagePath}`)" />
    <div class="rhs">
      <h1>{{ title }}</h1>
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
