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
          src="https://gray-wxix-prod.cdn.arcpublishing.com/resizer/Wcvj6Ck3DlZBK5LIrJRxgmFuTfw=/980x0/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/SVV7MS42M5COTEQW7CXWA3XLKI.gif"
        />
      </div>
      <div>
        <img
          src="https://gray-wxix-prod.cdn.arcpublishing.com/resizer/Wcvj6Ck3DlZBK5LIrJRxgmFuTfw=/980x0/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/SVV7MS42M5COTEQW7CXWA3XLKI.gif"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Paycor_Stadium_logo.svg/1200px-Paycor_Stadium_logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Paycor_Stadium_logo.svg/1200px-Paycor_Stadium_logo.svg.png"
        />
      </div>
      <div>
        <img
          src="https://www.pngmart.com/files/22/Cincinnati-Bengals-PNG-File.png"
        />
      </div>
      <div>
        <img
          src="https://www.pngmart.com/files/22/Cincinnati-Bengals-PNG-File.png"
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
