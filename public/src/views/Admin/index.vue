<template>
  <div v-if="getLoggedInUser.access_level >= 30" class="admin">
    <h1 class="site-title">Site Settings</h1>
    <div class="default-card default-width site-settings">
      <p>
        Primary Color |
        <span style="color: #FB4F14">Bengals Orange: #FB4F14</span> |
        <span style="color: #BC011D">Reds Red: #BC011D</span>
      </p>
      <input
        v-for="field in fields"
        :key="field.name"
        :placeholder="field.placeholder"
        :disabled="!isEditing"
        :name="field.name"
        :type="field.type"
        class="default-input"
        v-model="field.value"
      />
      <button v-if="!isEditing" class="btn" @click="editSettings">Edit</button>
      <button v-if="isEditing" class="btn" @click="saveSettings">Save</button>
      <button v-if="isEditing" class="btn" @click="cancelSettings">
        Cancel
      </button>
    </div>
    <h1 class="site-title">Access Levels</h1>
    <div class="access-level-info default-card default-width">
      <p>Writers page is sorted by access level, low to high</p>
      <p><strong>Access Level 0:</strong> Can Like</p>
      <p><strong>Access Level 1 (default)</strong>: Can Comment</p>
      <p>
        <strong>Access Level 10</strong>: Can create articles - Shows up on
        Writers page
      </p>
      <p><strong>Access Level 20</strong>: Can delete any article or comment</p>
      <p><strong>Access Level 30</strong>: Has access to admin page</p>
    </div>
    <div class="default-width access-levels">
      <div v-for="user in users" :key="user._id">
        <WriterCard :writerID="user._id" />
      </div>
    </div>
  </div>
</template>

<script src="./admin.ts"></script>
<style src="./admin.scss" lang="scss"></style>
