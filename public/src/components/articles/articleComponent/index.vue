<template>
  <div class="article-component">
    <h1>test</h1>
    <h1>{{ postInfo.title }}</h1>
    <h5>By: {{ authorName }}</h5>
    <div class="tags">
      <p v-for="tag in postInfo.tags" :key="tag.name">{{ tag }}</p>
    </div>
    <p>{{ postInfo.description }}</p>
  </div>
</template>

<script src="./articleComponent.ts"></script>
<style src="./articleComponent.scss" lang="scss"></style>
