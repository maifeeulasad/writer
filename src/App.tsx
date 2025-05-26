import React, { useEffect, useRef, useState } from 'react';
import { CkEditor, CkEditorRef } from './components/editor/ck/CkEditor';
import { SummarizeText } from './components/ai/SummarizeText';
import { GenerateText } from './components/ai/GenerateText';

const App = () => {
    const editorRef = useRef<CkEditorRef>(null);
    const [editorReady, setEditorReady] = useState(false);

    useEffect(() => {
        const checkEditor = setInterval(() => {
            if (editorRef.current) {
                setEditorReady(true);
                clearInterval(checkEditor);
            }
        }, 50);

        return () => clearInterval(checkEditor);
    }, []);

    const enterOnEditor = (text: string) => {
        console.log('Entering text into editor:', text);
        editorRef.current?.appendData?.(text);
    }

    return (
        <div>
            <GenerateText enterOnEditor={enterOnEditor} />
            {editorReady && <SummarizeText editor={editorRef.current} />}
            <CkEditor ref={editorRef} />
        </div>
    );
};

export { App };