<template>
  <div class="article-component">
    <div class="article-top">
      <img :src="require(`@/uploads/${imagePath}`)" />
      <h1>{{ postInfo.title }}</h1>
      <h5 @click="redirect('/writers/' + postInfo.owner_id)">
        By: {{ authorName }}
      </h5>
      <div class="tags">
        <p v-for="tag in postInfo.tags" :key="tag.name">
          {{ tag }}
        </p>
      </div>
      <p>{{ date }}</p>
      <p>{{ numLikes }} like(s)</p>
      <br />
      <span class="article-content" v-html="postInfo.description"></span>
      <font-awesome-icon
        v-if="!isLiked"
        class="like-btn not-liked"
        :icon="['fas', 'thumbs-up']"
        @click="likePost"
      ></font-awesome-icon>
      <font-awesome-icon
        v-if="isLiked"
        class="like-btn liked"
        :icon="['fas', 'thumbs-up']"
        @click="unlikePost"
      ></font-awesome-icon>
    </div>
    <h3 v-if="postInfo.comments.length == 0">No Comments</h3>
    <h3 v-if="postInfo.comments.length != 0">Comments</h3>
    <CommentCard
      v-for="comment in postInfo.comments"
      :key="generateKey(comment.user_id, comment.comment)"
      :uid="comment.user_id"
      :comment="comment.comment"
      @deleted="deleteComment(comment._id)"
      @edit="updateComment(comment._id, $event)"
    />
    <div v-if="getIsLoggedIn" class="comment-editor">
      <h5>Enter a comment below</h5>
      <TextEditor v-model="commentContent" />
      <button @click="postComment" class="btn">Post</button>
    </div>
  </div>
</template>

<script src="./articleComponent.ts"></script>
<style src="./articleComponent.scss" lang="scss"></style>
