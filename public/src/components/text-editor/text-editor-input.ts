import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default defineComponent({
  name: "text-editor",
  data() {
    return {
      editor: Object(),
    };
  },
  components: {
    EditorContent,
  },
  mounted() {
    this.editor = new Editor({
      content: "<p>Test text</p>",
      extensions: [StarterKit],
    });
  },
  onBeforeUnmount() {
    this.editor.destroy();
  },
});
