<template>
  <div class="signup-container">
    <div class="signup-container_title">
      <img :src="getLogo" />
      <h1 class="site-title">Nati King</h1>
    </div>
    <div class="signup-container_fields">
      <div
        class="signup-container_fields_field"
        v-for="field in fields"
        :key="field.name"
      >
        <div
          class="login-input"
          :class="{
            'extra-margin-top': field.value !== '',
            error:
              (field.name == 'email' && !validEmail) ||
              (field.name == 'password' && !validPassword) ||
              (field.name == 'confirm' && !confirmPassMatch),
          }"
        >
          <transition name="slide">
            <label
              v-if="field.value !== ''"
              class="signup-container_fields_field_label"
              :for="field.name"
              >{{ field.placeholder }}</label
            >
          </transition>
          <input
            class="default-input"
            :id="field.name + '_elm'"
            :type="'text'"
            :placeholder="field.placeholder"
            :name="field.name"
            v-model="field.value"
          />
          <span class="login-input_required" v-if="field.isRequired">*</span>
          <span
            class="login-input_error email-error"
            v-if="field.name == 'email' && !validEmail"
            >Please enter a valid email</span
          >
          <span
            class="login-input_error password-error"
            v-else-if="field.name == 'password' && !validPassword"
            >Password must have at least 6 characters</span
          >
          <span
            class="login-input_error confirm-password-error"
            v-else-if="field.name == 'confirm' && !confirmPassMatch"
            >Passwords do not match</span
          >
        </div>
      </div>
    </div>

    <button
      class="btn red_btn"
      :class="{ disabled: !enabledSignUpButton }"
      @click="signUp"
    >
      Sign Up
    </button>
  </div>
</template>

<script src="./signup.ts"></script>
<style src="./signup.scss" lang="scss"></style>
