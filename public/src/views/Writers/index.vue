<template>
  <div class="writers">
    <h1 class="site-title">Writers</h1>
    <!-- <PostCard
      v-for="post in splicedPosts"
      :key="post._id"
      :title="post.title"
      :authorID="post.owner_id"
      :tags="post.tags"
      :commentAmt="post.comments.length"
      :likeAmt="post.likes.length"
    /> -->
    <p>{{ writers }}</p>
  </div>
</template>

<script src="./writers.ts"></script>
<style src="./writers.scss" lang="scss"></style>
