<template>
  <div class="home">
    <h1 class="site-title">Nati King</h1>
    <div class="default-width search-fields">
      <TagInput v-model="tagsArray" v-on:input="tagSearch" />
      <button
        @click="tagSearch"
        v-if="tagsArray.length > 0"
        class="btn search-btn"
      >
        Search
      </button>
    </div>
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
      class="post-card"
    />
    <div v-if="isLoading">
      <LoadingIcon />
    </div>
  </div>
</template>

<script src="./home.ts"></script>
<style src="./home.scss" lang="scss"></style>
