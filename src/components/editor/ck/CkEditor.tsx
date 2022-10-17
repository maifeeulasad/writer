import React from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./CkEditor.css";

const CkEditor = () => {
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
