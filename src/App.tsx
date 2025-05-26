import React, { useRef } from 'react';
// import { Editor } from './components/editor';
import { GenerateText } from './components/ai/GenerateText';
import { CkEditor, CkEditorRef } from './components/editor/ck/CkEditor';

const App = () => {
    const editorRef = useRef<CkEditorRef>(null);

    const enterOnEditor = (text: string) => {
        console.log('Entering text into editor:', text);
        editorRef.current?.appendData(text);
    }

    return (
        <div>
            <GenerateText enterOnEditor={enterOnEditor} />
            <CkEditor ref={editorRef} />
        </div>
    );
}

export { App };