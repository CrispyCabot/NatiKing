<template>
  <div class="home">
    <h1 class="site-title">Nati King</h1>
    <PostCard title="Test Title" author="Joey Votto" />
    <PostCard title="New Title" author="Ugly McStupidFace" />
    <div style="background: white">
      <p>users</p>
      <ul id="example-1">
        <li v-for="item in users" :key="item.message">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./home.ts"></script>
<style src="./home.scss" lang="scss"></style>
