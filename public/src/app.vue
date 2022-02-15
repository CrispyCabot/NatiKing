<template>
  <div class="app-container">
    <Teleport v-if="isMounted" to="head">
      <title>Nati King</title>
      <meta name="twitter:url" content="https://natiking.com" />
      <meta name="twitter:title" content="Nati King | Home" />
      <meta name="twitter:description" content="View the latest posts" />
    </Teleport>
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
    <div class="leaf">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cincinnati_Bengals_logo.svg/1280px-Cincinnati_Bengals_logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cincinnati_Bengals_logo.svg/1280px-Cincinnati_Bengals_logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cincinnati_Bengals_logo.svg/1280px-Cincinnati_Bengals_logo.svg.png"
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
