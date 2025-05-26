import React, { useState } from 'react';
import { Button, Modal, Input, Checkbox } from 'antd';
import { writeForMe } from '../../core/ai/InBrowserAi';

interface IGenerateText {
    enterOnEditor: (text: string) => void;
}

const GenerateText = ({ enterOnEditor }: IGenerateText) => {
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [clearPrevious, setClearPrevious] = useState<boolean>(false);

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setModalVisibility(true);
                }}
            >
                Generate Text
            </Button>

            <Modal
                title="Generate Text"
                visible={modalVisibility}
                onCancel={() => setModalVisibility(false)}
                footer={[
                    <Button key="back" onClick={() => setModalVisibility(false)}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {
                        if (clearPrevious) {
                            setOutputText('');
                        }
                        writeForMe({
                            prompt: inputText,
                            onChunk: (chunk) => {
                                setOutputText((prev) => prev + chunk);
                            },
                            onComplete: () => {
                                console.log('Text generation complete');
                            },
                            onError: (error) => {
                                console.error('Error during text generation:', error);
                                setOutputText('An error occurred during text generation.');
                            },
                        });
                    }}>
                        Generate
                    </Button>,
                    <Button key="toeditor" type="primary" onClick={() => {
                        if (outputText) {
                            enterOnEditor(outputText);
                            setModalVisibility(false);
                        }
                    }}>
                        Enter in Editor
                    </Button>,
                ]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Enter your prompt here..."
                    style={{ marginBottom: '16px' }}
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                />
                <div>
                    Clear previous output before generating new text?
                    <Checkbox value={clearPrevious} onChange={(e) => { setClearPrevious(e.target.checked) }} />
                </div>
                <Input.TextArea
                    rows={10}
                    placeholder="Generated text will appear here..."
                    readOnly
                    value={outputText}
                />
            </Modal>
        </div>
    );
}

export { GenerateText };