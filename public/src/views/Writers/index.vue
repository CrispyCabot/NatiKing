<template>
  <div class="writers">
    <h1 class="site-title">Writers</h1>
    <WriterCard
      v-for="writer in writers"
      :key="writer._id"
      :writerID="writer._id"
    />
  </div>
</template>

<script src="./writers.ts"></script>
<style src="./writers.scss" lang="scss"></style>
