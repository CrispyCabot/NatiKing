<template>
  <div class="create-post">
    <div v-if="getLoggedInUser.access_level >= 10">
      <h1 class="site-title">Create a Post</h1>
      <div class="editor">
        <input v-model="title" placeholder="Enter a title..." />
        <fieldset>
          <legend>Visible?</legend>

          <input
            v-model="visible"
            type="radio"
            id="yesVisible"
            value="yes"
            name="visible"
          />
          <label for="yesVisible">Yes</label><br />

          <input
            v-model="visible"
            value="no"
            type="radio"
            id="noVisible"
            name="visible"
          />
          <label for="noVisible">No</label><br />
        </fieldset>
        <ArticleEditor v-model="content" />
        <TagInput v-model="tagsArray" />
      </div>
      <button class="btn" @click="createPost">Submit</button>
    </div>
  </div>
</template>

<script src="./create-post.ts"></script>
<style src="./create-post.scss" lang="scss"></style>
