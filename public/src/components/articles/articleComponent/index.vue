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
      <span v-html="postInfo.description"></span>
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
    <h3>Comments</h3>
    <CommentCard
      v-for="comment in postInfo.comments"
      :key="generateKey(comment.user_id, comment.comment)"
      :uid="comment.user_id"
      :comment="comment.comment"
    />
  </div>
</template>

<script src="./articleComponent.ts"></script>
<style src="./articleComponent.scss" lang="scss"></style>
