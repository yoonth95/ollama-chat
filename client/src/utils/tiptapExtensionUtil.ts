import { Extension } from "@tiptap/core";

const ShiftEnterExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      "Shift-Enter": ({ editor }) => {
        editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
        return true;
      },
    };
  },
});

export { ShiftEnterExtension };
