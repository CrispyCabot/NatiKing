<template>
  <div class="comment-card">
    <img class="comment-card_img" :src="require(`@/uploads/${imagePath}`)" />
    <div class="rhs">
      <h5>{{ authorName }}</h5>
      <span v-if="!isEditing" v-html="comment"></span>
      <div v-if="isEditing">
        <TextEditor class="comment-text" v-model="commentContent" />
        <button class="btn comment-save-btn" @click="saveComment">Save</button>
      </div>
    </div>
    <div class="comment-icons">
      <i
        v-if="getLoggedInUser.access_level >= 15 || getLoggedInUser._id === uid"
        class="fa fa-trash fa-lg comment-icon delete"
        @click="deleteComment"
      ></i>
      <i
        v-if="getLoggedInUser._id == uid"
        class="fas fa-edit fa-lg comment-icon edit"
        @click="editComment"
      ></i>
    </div>
  </div>
</template>

<script src="./comment-card.ts"></script>
<style src="./comment-card.scss" lang="scss"></style>
