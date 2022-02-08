<template>
  <div class="create-post">
    <div v-if="getLoggedInUser.access_level >= 10">
      <h1 class="site-title">Create a Post</h1>
      <div class="editor">
        <input v-model="title" placeholder="Enter a title..." />
        <ArticleEditor v-model="content" />
        <input
          v-model="tags"
          v-on:input="formatTags"
          placeholder="Enter some tags..."
        />
        <div class="tags">
          <div class="tag" v-for="tag in tagsArray" :key="tag">
            <p>
              {{ tag }}
            </p>
            <font-awesome-icon
              class="x-icon"
              :icon="['fas', 'times-circle']"
              @click="removeTag(tag)"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <button class="btn" @click="createPost">Submit</button>
    </div>
  </div>
</template>

<script src="./create-post.ts"></script>
<style src="./create-post.scss" lang="scss"></style>
