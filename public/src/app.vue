<template>
  <div class="app-container">
    <div v-if="getGlobalToastIsShowing" class="global-toast">
      <Toast
        :message="getGlobalToastMessage"
        :type="getGlobalToastType"
        :duration="getGlobalToastDuration"
        :isShowing="getGlobalToastIsShowing"
        :key="getGlobalToastIsShowingOverride"
        @close="closingGlobalToast"
      />
    </div>
    <Navbar />
    <div
      ref="router_view"
      class="router-view"
      :class="{
        'mobile-router-view': isMobileView,
        'not-max-viewport-height-router-view': !isMaxViewportHeight,
      }"
    >
      <router-view />
    </div>
    <div v-if="!isMobileView" class="leaf">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
          height="75px"
          width="75px"
        />
      </div>
    </div>
    <!-- <inline-svg class="background-svg" :src="backgroundSvg"></inline-svg> -->
    <span ref="footer_element">
      <CustomFooter
        :class="{ 'max-viewport-height-footer': isMaxViewportHeight }"
      />
    </span>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.scss" lang="scss"></style>
