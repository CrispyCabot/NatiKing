<template>
  <div class="tag-input" @click="focusInput">
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
</template>

<script src="./tag-input.ts"></script>
<style src="./tag-input.scss" lang="scss"></style>
