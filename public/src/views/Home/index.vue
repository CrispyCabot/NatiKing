<template>
  <div class="home">
    <h1 class="site-title">Nati King</h1>
    <div
      v-if="
        visibleArticles ||
          (!visibleArticles && getLoggedInUser.access_level >= 10)
      "
    >
      <div class="default-width search-fields">
        <TagInput v-model="tagsArray" v-on:input="tagSearch" />
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
    </div>
    <div
      v-if="
        !visibleArticles &&
          (!getIsLoggedIn || getLoggedInUser.access_level < 10)
      "
    >
      <h1 class="site-title">You do not have access to this page</h1>
    </div>
    <div v-if="isLoading">
      <LoadingBar />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
</template>

<script src="./home.ts"></script>
<style src="./home.scss" lang="scss"></style>
