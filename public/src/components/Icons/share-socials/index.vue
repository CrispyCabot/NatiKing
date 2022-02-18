<template>
  <div class="share-socials">
    <p class="share-socials_p">Share</p>
    <i
      @click="shareTwitter"
      class="fab fa-twitter-square share-socials_icon"
    ></i>
    <i @click="shareLink" class="fas fa-link share-socials_icon"></i>
  </div>
</template>

<script src="./share-socials.ts"></script>
<style src="./share-socials.scss" lang="scss"></style>
