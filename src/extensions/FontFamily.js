// /src/extensions/FontFamily.js
import { Mark, mergeAttributes } from '@tiptap/core'

export const FontFamily = Mark.create({
  name: 'fontFamily',
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  addAttributes() {
    return {
      family: {
        default: null,
        parseHTML: element => element.style.fontFamily || null,
        renderHTML: attributes => {
          if (!attributes.family) return {}
          return { style: `font-family: ${attributes.family}` }
        },
      },
    }
  },
  parseHTML() {
    return [
      { style: 'font-family' },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
  addCommands() {
    return {
      setFontFamily:
        family => ({ chain }) => {
          return chain().setMark(this.name, { family }).run()
        },
      unsetFontFamily:
        () => ({ chain }) => {
          return chain().unsetMark(this.name).run()
        },
    }
  },
})
