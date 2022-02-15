<template>
  <div class="loading-icon default-width">
    <!-- <img class="loading-icon_img" :src="require('@/assets/nklogo.png')" /> -->
    <img
      class="loading-icon_img loading-icon_inverted"
      id="img"
      :src="require('@/assets/nklogo-inverted.png')"
    />

    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <p>Loading</p>
  </div>
</template>

<script src="./loading-icon.ts"></script>
<style src="./loading-icon.scss" lang="scss"></style>
