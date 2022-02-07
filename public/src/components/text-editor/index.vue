<template>
  <div class="text-editor">
    <bubble-menu class="bubble-menu" :editor="editor" v-if="editor">
      <i
        class="fas fa-bold bubble-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bold') }"
      >
      </i>
      <i
        class="fas fa-italic bubble-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        "
        :class="{ 'is-active': editor.isActive('italic') }"
      >
      </i>
      <i
        class="fas fa-strikethrough bubble-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        "
        :class="{ 'is-active': editor.isActive('strike') }"
      >
      </i>
      <i
        class="fas fa-underline bubble-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        "
        :class="{ 'is-active': editor.isActive('underline') }"
      >
      </i>
    </bubble-menu>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },
  data() {
    return {
      editor: null,
    };
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [StarterKit, Underline],
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },
};
</script>
<style src="./text-editor.scss" lang="scss"></style>
