import React, { useState } from 'react';
import Editor, {
  BtnBold,
  BtnItalic,
  createButton,
  Toolbar
} from 'react-simple-wysiwyg';
import { Modal, Button, Input, Checkbox, Spin, Typography, message } from 'antd';
import { writeForMe, summarizeForMe } from '../../../core/ai/InBrowserAi';

const { Paragraph, Text } = Typography;

const GenerateModalContent = ({
  inputText,
  setInputText,
  clearPrevious,
  setClearPrevious,
}: {
  inputText: string;
  setInputText: (t: string) => void;
  clearPrevious: boolean;
  setClearPrevious: (v: boolean) => void;
}) => (
  <>
    <Input.TextArea
      rows={4}
      placeholder="Enter your prompt here..."
      style={{ marginBottom: '16px' }}
      onChange={(e) => setInputText(e.target.value)}
      value={inputText}
    />
    <Checkbox
      checked={clearPrevious}
      onChange={(e) => setClearPrevious(e.target.checked)}
      style={{ marginBottom: '16px' }}
    >
      Clear previous output before generating new text
    </Checkbox>
  </>
);

const OutputTextViewer = ({ outputText }: { outputText: string }) => (
  <Typography>
    {outputText ? (
      <Paragraph>
        {outputText.split('\n').map((line, index) => (
          <Text key={index}>{line}<br /></Text>
        ))}
      </Paragraph>
    ) : (
      <Text type="secondary">Waiting for output...</Text>
    )}
  </Typography>
);

const ReactSimpleWysiwygEditor = () => {
  const [html, setHtml] = useState('my <b>HTML</b>');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'generate' | 'summarize' | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [clearPrevious, setClearPrevious] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => setHtml(e.target.value);

  const handleGenerate = () => {
    if (clearPrevious) setOutputText('');
    setLoading(true);
    writeForMe({
      prompt: inputText,
      onChunk: (chunk) => setOutputText((prev) => prev + chunk),
      onComplete: () => setLoading(false),
      onError: (err) => {
        console.error(err);
        setLoading(false);
        setOutputText('An error occurred during text generation.');
      },
    });
  };

  const handleSummarize = async () => {
    setOutputText('');
    setLoading(true);
    await summarizeForMe({
      input: html,
      onChunk: (chunk) => setOutputText((prev) => prev + chunk),
      onComplete: () => setLoading(false),
      onError: (err) => {
        setLoading(false);
        message.error("Summary generation failed.");
        setOutputText("An error occurred during summary generation.");
      },
    });
  };

  const openModal = (type: 'generate' | 'summarize') => {
    setModalType(type);
    setOutputText('');
    if (type === 'generate') {
      setInputText('');
    } else {
      handleSummarize();
    }
    setModalVisible(true);
  };

  const BtnGenerateText = createButton('Generate Text', '🧠', () => openModal('generate'));
  const BtnSummarizeText = createButton('Summarize Text', '📝', () => openModal('summarize'));

  return (
    <>
      <Editor value={html} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnGenerateText />
          <BtnSummarizeText />
        </Toolbar>
      </Editor>

      <Modal
        title={modalType === 'generate' ? 'Generate Text' : 'Summarize Text'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setOutputText('');
          setInputText('');
          setLoading(false);
        }}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>Close</Button>,
          modalType === 'generate' && (
            <Button key="generate" type="primary" disabled={loading} onClick={handleGenerate}>
              Generate
            </Button>
          ),
          modalType === 'generate' && (
            <Button key="insert" type="primary" disabled={loading} onClick={() => {
              setHtml((prev) => clearPrevious ? outputText : prev + outputText);
              setModalVisible(false);
            }}>
              Enter in Editor
            </Button>
          )
        ]}
        width={700}
        bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}
      >
        {modalType === 'generate' && (
          <GenerateModalContent
            inputText={inputText}
            setInputText={setInputText}
            clearPrevious={clearPrevious}
            setClearPrevious={setClearPrevious}
          />
        )}
        <Spin spinning={loading}>
          <OutputTextViewer outputText={outputText} />
        </Spin>
      </Modal>
    </>
  );
};

export { ReactSimpleWysiwygEditor };
