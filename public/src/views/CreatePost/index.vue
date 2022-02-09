<template>
  <div class="create-post">
    <div v-if="getLoggedInUser.access_level >= 10">
      <h1 class="site-title">Create a Post</h1>
      <div class="editor">
        <input v-model="title" placeholder="Enter a title..." />
        <ArticleEditor v-model="content" />
        <TagInput v-model="tagsArray" />
      </div>
      <button class="btn" @click="createPost">Submit</button>
    </div>
  </div>
</template>

<script src="./create-post.ts"></script>
<style src="./create-post.scss" lang="scss"></style>
