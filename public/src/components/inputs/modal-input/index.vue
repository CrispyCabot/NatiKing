<template>
  <div class="modal-input" @click="focusInput">
    <div v-if="showModal" class="modal-content">
      <h1>{{ title }}</h1>
      <div class="inputFields">
        <p>{{ prompt }}</p>
        <input
          v-model="inp"
          :placeholder="placeholder"
          :name="name"
          :type="type"
        />
      </div>
      <button @click="emitClick">Submit</button>
    </div>
  </div>
</template>

<script src="./modal-input.ts"></script>
<style src="./modal-input.scss" lang="scss"></style>
