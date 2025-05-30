import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./CkEditor.css";

export type CkEditorRef = {
  appendData?: (data: string) => void;
  getData?: () => string;
};

const CkEditor = forwardRef<CkEditorRef>((_, ref) => {
  const editorInstance = useRef<any>(null);
  const [, setEditorLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    appendData: (data: string) => {
      console.debug("Appending data to CKEditor measw:", data);
      if (editorInstance.current) {
        const existingData = editorInstance.current.getData();
        editorInstance.current.setData(existingData + data);
      }
    },
    getData: () => {
      if (editorInstance.current) {
        return editorInstance.current.getData();
      }
      return "";
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
        console.debug("Editor is ready to use!", editor);
        console.debug(
          "toolbar: ",
          Array.from(editor.ui.componentFactory.names())
        );
        console.debug(
          "plugins: ",
          ClassicEditor.builtinPlugins.map((plugin: any) => plugin.pluginName)
        );
      }}
      onChange={(event: any, editor: any) => {
        editorInstance.current = editor;
        const data = editor.getData();
        console.debug({ event, editor, data });
      }}
      onBlur={(editor: any) => {
        console.debug("Blur.", editor);
      }}
      onFocus={(editor: any) => {
        console.debug("Focus.", editor);
      }}
    />
  );
});

export { CkEditor };
