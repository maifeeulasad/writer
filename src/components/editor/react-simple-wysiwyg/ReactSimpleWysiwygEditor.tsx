import React, { useState } from 'react';

import Editor, {
  BtnBold,
  BtnItalic,
  createButton,
  Toolbar
} from 'react-simple-wysiwyg';


const ReactSimpleWysiwygEditor = () => {

  const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
  const BtnTest = createButton('Test', 'T', (state) => {
    console.log('Test button clicked', state);
  });

  const [html, setHtml] = useState('my <b>HTML</b>');

  const onChange = (e: any) => {
    setHtml(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange}>
      <Toolbar>
        <BtnBold />
        <BtnItalic />
        <BtnAlignCenter />
        <BtnTest />
      </Toolbar>
    </Editor>
  );
}

export { ReactSimpleWysiwygEditor };