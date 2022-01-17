<template>
  <div class="comment-card">
    <img class="comment-card_img" :src="require(`@/uploads/${imagePath}`)" />
    <div class="rhs">
      <h5>{{ authorName }}</h5>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script src="./comment-card.ts"></script>
<style src="./comment-card.scss" lang="scss"></style>
