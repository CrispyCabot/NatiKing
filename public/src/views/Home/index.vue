<template>
  <div class="home">
    <h1 class="site-title">Nati King</h1>
    <PostCard
      v-for="post in splicedPosts"
      :key="post._id"
      :title="post.title"
      :author="post.owner_id"
    />
  </div>
</template>

<script src="./home.ts"></script>
<style src="./home.scss" lang="scss"></style>
