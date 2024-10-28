import {
  component$,
  type Signal,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import Quill from "quill";
import quilStyles from "quill/dist/quill.snow.css?inline";
export const Editor = component$(({ content }: { content: Signal<string> }) => {
  useStyles$(quilStyles);
  const editorSig = useSignal<HTMLElement>();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (editorSig.value) {
      const quill = new Quill(editorSig.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link"],
            ["clean"],
            ["clear"],
          ],
        },
      });
      quill.on("text-change", () => {
        content.value = quill.root.innerHTML;
      });
    }
  });
  return <div ref={editorSig}></div>;
});
