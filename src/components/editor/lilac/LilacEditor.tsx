import React from 'react';
import { Editor, wordCountPlugin, emojiPlugin, tablePlugin } from 'lilac-editor';
import 'lilac-editor/style.css';

const LilacEditor = () =>
  <Editor
    initialContent="<h1>Welcome to Lilac!</h1><p>Start typing...</p>"
    plugins={[
      wordCountPlugin,
      emojiPlugin,
      tablePlugin,
    ]}
    toolbar={{ show: true }}
  />
  
export { LilacEditor };