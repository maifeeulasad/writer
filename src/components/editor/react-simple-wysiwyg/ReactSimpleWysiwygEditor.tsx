import React, { useState } from 'react';

import Editor, { 
  BtnBold, 
  BtnItalic, 
  createButton,
  Toolbar
} from 'react-simple-wysiwyg';

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

const ReactSimpleWysiwygEditor = () => {
    const [html, setHtml] = useState('my <b>HTML</b>');
  
    const onChange = (e:any) => {
    setHtml(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange}>
      <Toolbar>
        <BtnBold />
        <BtnItalic />
        <BtnAlignCenter />
      </Toolbar>
    </Editor>
  );
}

export { ReactSimpleWysiwygEditor };