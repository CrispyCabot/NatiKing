<template>
  <div class="article-editor">
    <div class="editor-controls" :editor="editor" v-if="editor">
      <i
        class="fas fa-bold editor-icon"
        title="Toggle Bold"
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
        title="Toggle Italic"
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
        title="Toggle Strikethrough"
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
        title="Toggle Underline"
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
        title="Highlight Text"
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
        title="Create Heading 1"
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
        title="Create Heading 2"
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
        title="Toggle Paragraph"
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
        title="Toggle Unordered List"
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
        title="Toggle Ordered List"
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
      <i
        class="fas fa-align-left editor-icon"
        title="Align Left"
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('left')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      >
      </i>
      <i
        class="fas fa-align-center editor-icon"
        title="Align Center"
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('center')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      >
      </i>
      <i
        class="fas fa-align-right editor-icon"
        title="Align Right"
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('right')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      >
      </i>
      <span class="separator">|</span>
      <i
        class="fas fa-quote-left editor-icon"
        title="Insert blockquote"
        @click="
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        "
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
      </i>
      <i
        class="fas fa-grip-lines editor-icon"
        title="Insert Horizontal Break"
        @click="
          editor
            .chain()
            .focus()
            .setHorizontalRule()
            .run()
        "
      >
      </i>
      <span class="separator">|</span>
      <i
        title="Insert Image"
        class="fas fa-image fa-lg editor-icon"
        @click="addImage"
      >
      </i>
      <i
        title="Insert IFrame/Video"
        class="fas fa-video fa-lg editor-icon"
        @click="addIframe"
      >
      </i>
      <i
        class="fas fa-arrow-left editor-icon"
        title="Undo"
        @click="
          editor
            .chain()
            .focus()
            .undo()
            .run()
        "
        :disabled="!editor.can().undo()"
      >
      </i>
      <i
        class="fas fa-arrow-right editor-icon"
        title="Redo"
        @click="
          editor
            .chain()
            .focus()
            .redo()
            .run()
        "
        :disabled="!editor.can().redo()"
      >
      </i>
      <p>To create blank spaces, use SHIFT + ENTER - NOT JUST ENTER</p>
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
import TextAlign from "@tiptap/extension-text-align";
import BlockQuote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Iframe from "./iframe";

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
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        BlockQuote.configure({
          HTMLAttributes: {
            class: "blockquote",
          },
        }),
        HorizontalRule.configure({
          HTMLAttributes: {
            class: "horizontal-rule",
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: "article-editor-img",
          },
          inline: true,
        }),
        Iframe,
        Link.configure({
          HTMLAttributes: {
            class: "article-editor-link",
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
  methods: {
    addImage() {
      const url = window.prompt("Enter the image url");

      if (url) {
        this.editor
          .chain()
          .focus()
          .setImage({ src: url })
          .run();
      }
    },
    addIframe() {
      const url = window.prompt(
        `Enter the video url. Note for YouTube, you must change the 'watch' to 
        'embed' and remove any special characters. For example, https://www.youtube.com/watch?v=rX1eg76Y0pc 
        needs to become https://www.youtube.com/embed/rX1eg76Y0pc.`
      );

      if (url) {
        this.editor
          .chain()
          .focus()
          .setIframe({ src: url })
          .run();
      }
    },
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
