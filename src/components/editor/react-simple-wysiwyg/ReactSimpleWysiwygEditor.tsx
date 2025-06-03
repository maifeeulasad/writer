import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

const ReactSimpleWysiwygEditor = () => {
    const [html, setHtml] = useState('my <b>HTML</b>');
  
    const onChange = (e:any) => {
    setHtml(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange} />
  );
}

export { ReactSimpleWysiwygEditor };