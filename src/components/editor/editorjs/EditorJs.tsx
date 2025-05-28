import React from 'react';

import EditorJS from '@editorjs/editorjs';



const EditorJs = () => {

    new EditorJS({
        holder: 'editorjs'
    });
    return (
        <div id='editorjs' style={{ height: '100vh', border: '1px red solid' }} />
    );
}

export { EditorJs }