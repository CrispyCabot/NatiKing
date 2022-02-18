// @ts-nocheck
import { Node, mergeAttributes, wrappingInputRule } from "@tiptap/core";

export interface CaptionOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote: {
      /**
       * Set a caption node
       */
      setCaption: () => ReturnType;
      /**
       * Toggle a caption node
       */
      toggleCaption: () => ReturnType;
      /**
       * Unset a caption node
       */
      unsetCaption: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*>\s$/;

export default Node.create<CaptionOptions>({
  name: "caption",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "block+",

  group: "block",

  defining: true,

  parseHTML() {
    return [{ tag: "blockquote" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setCaption: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      toggleCaption: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      unsetCaption: () => ({ commands }) => {
        return commands.lift(this.name);
      },
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
