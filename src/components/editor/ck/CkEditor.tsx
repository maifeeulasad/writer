import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./CkEditor.css";

export type CkEditorRef = {
  appendData: (data: string) => void;
};

const CkEditor = forwardRef<CkEditorRef>((_, ref) => {
  const editorInstance = useRef<any>(null);
  // @ts-ignore
  const [editorLoaded, setEditorLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    appendData: (data: string) => {
      console.log("Appending data to CKEditor measw:", data);
      if (editorInstance.current) {
        const existingData = editorInstance.current.getData();
        editorInstance.current.setData(existingData + data);
      }
    },
  }));

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
      onReady={(editor: any) => {
        editorInstance.current = editor;
        setEditorLoaded(true);
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
        editorInstance.current = editor;
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
});

export { CkEditor };
