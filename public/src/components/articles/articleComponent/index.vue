<template>
  <div class="default-width article-component">
    <teleport to="head" v-if="isMounted">
      <title>{{ pageTitle }}</title>
    </teleport>
    <div v-if="isLoading">
      <LoadingBar />
      <BigSkeletonCard />
    </div>
    <div v-if="!isLoading">
      <div class="default-card article-top">
        <img :src="require(`@/uploads/${imagePath}`)" />
        <h1 v-if="!isEditing">{{ postInfo.title }}</h1>
        <input v-if="isEditing" class="default-input" v-model="titleInput" />
        <h5 @click="redirect('/users/' + postInfo.owner_id)">
          By: {{ authorName }}
        </h5>
        <div v-if="!isEditing" class="tags">
          <p v-for="tag in postInfo.tags" :key="tag.name">
            {{ tag }}
          </p>
        </div>
        <TagInput v-if="isEditing" v-model="tagsArray" />
        <p>{{ date }}</p>
        <p>{{ numLikes }} like(s)</p>
        <br />
        <div v-if="!isEditing">
          <span class="article-content" v-html="postInfo.description"></span>
          <ShareSocials class="share-buttons" :message="postInfo.title" />
          <div class="article-icons">
            <div class="modify-icons">
              <i
                v-if="
                  getLoggedInUser.access_level >= 20 ||
                    getLoggedInUser._id === postInfo.owner_id
                "
                class="fa fa-trash fa-lg delete-article"
                @click="deleteArticlePrompt"
              ></i>
              <i
                v-if="getLoggedInUser._id == postInfo.owner_id"
                class="fas fa-edit fa-lg edit-article"
                @click="editArticle"
              ></i>
            </div>
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
        </div>
        <div v-if="isEditing">
          <ArticleEditor v-model="newArticleContent" />
          <button class="btn" @click="saveArticle">Save</button>
          <button class="btn" @click="cancelEdit">Cancel</button>
        </div>
      </div>
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
    <div
      v-if="getIsLoggedIn && getLoggedInUser.access_level >= 1"
      class="comment-editor"
    >
      <h5>Enter a comment below</h5>
      <TextEditor v-model="commentContent" />
      <button @click="postComment" class="btn">Post</button>
    </div>
  </div>
</template>

<script src="./articleComponent.ts"></script>
<style src="./articleComponent.scss" lang="scss"></style>
