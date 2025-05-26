import React from "react";
// import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "./TinyMceEditor.css";

/*
interface Props{
    dimension?: {
        height: number;
        width: number;
    }
}
*/

const TinyMceEditor = () => {
  // const editorRef = useRef<any>();

  // const onResize = () => {
  //   console.debug(editorRef.current.editor.height);
  //   editorRef.current.editor.height = Math.floor(window.innerHeight * 0.7);
  //   console.debug("here", window.innerHeight * 0.7);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", onResize);
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, []);

  return (
    <Editor
      id="---"
      // ref={editorRef}
      init={{
        plugins:
          "preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image media template link anchor codesample | ltr rtl",
        toolbar_sticky: true,
        branding: false,
        statusbar: false,
        menubar: false,
        height: window.innerHeight * 0.75,
      }}
    />
  );
};
export { TinyMceEditor };
