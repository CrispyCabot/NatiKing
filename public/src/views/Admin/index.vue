<template>
  <div v-if="getLoggedInUser.access_level >= 20" class="admin">
    <h1 class="site-title">Site Settings</h1>
    <div class="site-settings">
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
  </div>
</template>

<script src="./admin.ts"></script>
<style src="./admin.scss" lang="scss"></style>
