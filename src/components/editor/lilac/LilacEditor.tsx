import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Editor, type EditorRef, type EditorContext, pluginManager, wordCountPlugin, emojiPlugin, tablePlugin } from 'lilac-editor';
import 'lilac-editor/style.css';
import { GenerateText } from '../../ai/GenerateText';
import { SummarizeText } from '../../ai/SummarizeText';
import { downloadSummarizerModal } from '../../../core/ai/InBrowserAi';

const LilacEditor = () => {
    const editorRef = useRef<EditorRef>(null);
    const [generateModal, setGenerateModal] = useState(false);
    const [summarizeModal, setSummarizeModal] = useState(false);

    console.log('LilacEditor render - generateModal:', generateModal, 'summarizeModal:', summarizeModal);

    useEffect(() => {
        console.log('Modal state changed - generateModal:', generateModal, 'summarizeModal:', summarizeModal);
    }, [generateModal, summarizeModal]);

    const generatePlugin = useMemo(() => ({
        id: 'generate-text',
        name: 'Generate Text',
        version: '1.0.0',
        description: 'Generate text using AI',
        toolbarButtons: [
            {
                id: 'generate-button',
                icon: <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '10px', 
                    fontWeight: 'bold',
                    backgroundColor: '#1677ff',
                    color: 'white',
                    borderRadius: '3px'
                }}>AI</div>,
                label: 'Generate Text',
                tooltip: 'Generate text using AI',
                onClick: (context: EditorContext) => {
                    console.log('Generate plugin clicked');
                    setGenerateModal(true);
                    console.log('Generate modal state set to true');
                },
            },
        ],
    }), []);

    const summarizePlugin = useMemo(() => ({
        id: 'summarize-text',
        name: 'Summarize Text',
        version: '1.0.0',
        description: 'Summarize text using AI',
        toolbarButtons: [
            {
                id: 'summarize-button',
                icon: <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '10px', 
                    fontWeight: 'bold',
                    backgroundColor: '#52c41a',
                    color: 'white',
                    borderRadius: '3px'
                }}>∑</div>,
                label: 'Summarize Text',
                tooltip: 'Summarize text using AI',
                onClick: (context: EditorContext) => {
                    console.log('Summarize plugin clicked');
                    setSummarizeModal(true);
                    console.log('Summarize modal state set to true');
                },
            },
        ],
    }), []);

    useEffect(() => {
        // Initialize AI models
        console.log('Initializing AI models...');
        downloadSummarizerModal().catch(console.error);

        console.log('Installing plugins...');
        pluginManager.install(generatePlugin);
        pluginManager.install(summarizePlugin);
        console.log('Plugins installed successfully');

        return () => {
            console.log('Uninstalling plugins...');
            pluginManager.uninstall('generate-text');
            pluginManager.uninstall('summarize-text');
            console.log('Plugins uninstalled');
        };
    }, [generatePlugin, summarizePlugin]);

    console.log('About to render Editor with plugins:', [wordCountPlugin, emojiPlugin, tablePlugin, generatePlugin, summarizePlugin]);

    return (
        <div>
            <Editor
                ref={editorRef}
                initialContent="<h1>Welcome to Lilac!</h1><p>Start typing...</p>"
                plugins={[
                    wordCountPlugin,
                    emojiPlugin,
                    tablePlugin,
                    generatePlugin,
                    summarizePlugin,
                ]}
                toolbar={{ show: true }}
            />
            <GenerateText
                enterOnEditor={(text) => editorRef.current?.setContent(text)}
                modalVisibility={generateModal}
                setModalVisibility={setGenerateModal}
                showButton={false}
            />
            <SummarizeText
                getContent={() => {
                    const content = editorRef.current?.getContent();
                    console.debug("Editor content:", content);
                    return content || '';
                }}
                modalVisibility={summarizeModal}
                setModalVisibility={setSummarizeModal}
                showButton={false}
            />
        </div>
    );
}

export { LilacEditor };