<template>
  <div class="home">
    <h1 class="site-title">Nati King</h1>
    <PostCard
      v-for="post in splicedPosts"
      :key="post._id"
      :title="post.title"
      :authorID="post.owner_id"
      :tags="post.tags"
      :commentAmt="post.comments.length"
      :likeAmt="post.likes.length"
      :description="post.description"
      @click="redirect('/articles/' + post._id)"
    />
    <div v-if="!isLoading">
      <LoadingIcon />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
</template>

<script src="./home.ts"></script>
<style src="./home.scss" lang="scss"></style>
