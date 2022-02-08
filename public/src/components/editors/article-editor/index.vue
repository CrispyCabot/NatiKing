<template>
  <div class="article-editor">
    <div class="editor-controls" :editor="editor" v-if="editor">
      <i
        class="fas fa-bold editor-icon"
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
        class="fas fa-italic editor-icon"
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
        class="fas fa-strikethrough editor-icon"
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
        class="fas fa-underline editor-icon"
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
      <i
        class="fas fa-highlighter editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleHighlight()
            .run()
        "
        :class="{ 'is-active': editor.isActive('highlighter') }"
      >
      </i>
      <span class="separator">|</span>
      <p
        class="editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </p>
      <p
        class="editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </p>
      <i
        class="fas fa-paragraph editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .setParagraph()
            .run()
        "
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
      </i>
      <i
        class="fas fa-list editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
      </i>
      <i
        class="fas fa-list-ol editor-icon"
        @click="
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
      </i>
      <span class="separator">|</span>
    </div>

    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

export default {
  components: {
    EditorContent,
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
      extensions: [
        StarterKit,
        Underline,
        Highlight,
        Heading.configure({ levels: [1, 2] }),
        Paragraph,
        BulletList.configure({
          HTMLAttributes: {
            class: "indent",
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: "indent",
          },
        }),
      ],
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
<style src="./article-editor.scss" lang="scss"></style>
