import React, { useEffect } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./CkEditor.css";

const CkEditor = () => {
  const aiWriter = () => {
    // @ts-ignore
    return window.ai.writer.create({
      monitor(m: any) {
        m.addEventListener("downloadprogress", (e: any) => {
          const percent = ((e.loaded / e.total) * 100).toFixed(2);
          console.log(
            `Downloaded ${e.loaded} of ${e.total} bytes (${percent}%).`
          );
        });
      },
    });
  }
  const write = (aiWriter:any, prompt: string) => {
    return aiWriter.write(prompt);
    // @ts-ignore
    // return aiWriter().write(prompt);
  }

  const writeWithAI = async (prompt: string) => {
    const aiWriterInstance = await aiWriter();
    const response = write(aiWriterInstance, prompt);
    response.then((result: any) => {
      console.log(result);
    }).catch((error: any) => {
      console.error("Error:", error);
    });
  }

  useEffect(() => {
    writeWithAI("Hello world, write me story about a cat");
    // const aiWriterInstance = await aiWriter();
    // write("Hello world").then((result: any) => {
    //   console.log(result);
    // }).catch((error: any) => {
    //   console.error("Error:", error);
    // });
  }, [])

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "ckfinder",
          "|",
          "imageTextAlternative",
          "imageUpload",
          "imageStyle:full",
          "imageStyle:side",
          "|",
          "mediaEmbed",
          "insertTable",
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "|",
          "undo",
          "redo",
        ],
      }}
      onInit={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
        console.log(
          "toolbar: ",
          Array.from(editor.ui.componentFactory.names())
        );
        console.log(
          "plugins: ",
          ClassicEditor.builtinPlugins.map((plugin: any) => plugin.pluginName)
        );
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(editor: any) => {
        console.log("Blur.", editor);
      }}
      onFocus={(editor: any) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export { CkEditor };
