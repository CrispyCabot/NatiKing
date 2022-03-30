<template>
  <div class="app-container">
    <!-- <metainfo>
      <template v-slot:title="{ content, metainfo }">
        {{ content }}{{ metainfo.nothing }}
      </template>
      <template v-slot:twitter="{ content, metainfo }">
        {{ content }}{{ metainfo.nothing }}</template
      >
    </metainfo> -->
    <Teleport to="head" v-if="isMounted">
      <title>Nati King</title>
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
    <!-- <LogoBox /> -->
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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cincinnati_Bengals_logo.svg/1280px-Cincinnati_Bengals_logo.svg.png"
        />
      </div>
      <div>
        <img src="https://i.gyazo.com/51d3ac2e3da92bd13c4d9949ad845c71.png" />
      </div>
      <div>
        <img src="https://i.gyazo.com/51d3ac2e3da92bd13c4d9949ad845c71.png" />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Cincinnati_Reds_Logo.svg/1280px-Cincinnati_Reds_Logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Cincinnati_Reds_Logo.svg/1280px-Cincinnati_Reds_Logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Cincinnati_Reds_Logo.svg/1280px-Cincinnati_Reds_Logo.svg.png"
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
