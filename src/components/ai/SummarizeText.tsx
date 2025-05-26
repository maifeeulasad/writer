import React, { useEffect, useState } from "react";
import { Button, Modal, Spin, Typography, message } from "antd";
import { summarizeForMe } from "../../core/ai/InBrowserAi";
import { CkEditorRef } from "../editor/ck/CkEditor";

const { Paragraph, Text } = Typography;

interface ISummarizeText {
    editor?: CkEditorRef | null;
}

const SummarizeText = ({ editor }: ISummarizeText) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");

    const handleSummarize = async () => {
        if (!editor || !editor.getData) {
            message.error("Editor not available.");
            return;
        }

        const input = editor.getData();
        console.debug("Input for summarization:", input);
        setSummary("");
        setVisible(true);
        setLoading(true);

        await summarizeForMe({
            input,
            onChunk: (chunk) => {
                setSummary((prev) => prev + chunk);
            },
            onComplete: () => {
                setLoading(false);
            },
            onError: (err) => {
                setLoading(false);
                message.error("Summary generation failed.");
                console.error("Error during summarization:", err);
                setSummary("An error occurred during summary generation.");
            },
        });
    };

    return (
        <>
            <Button type="primary" onClick={handleSummarize}>
                Summarize Text
            </Button>

            <Modal
                title="Summarizing..."
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                    setSummary("");
                    setLoading(false);
                }}
                footer={null}
                width={700}
                bodyStyle={{ maxHeight: 400, overflowY: "auto" }}
            >
                <Spin spinning={loading}>
                    <Typography>
                        {summary ? (
                            <Paragraph>
                                {summary.split("\n").map((line, index) => (
                                    <Text key={index}>{line}<br /></Text>
                                ))}
                            </Paragraph>
                        ) : (
                            <Text type="secondary">Waiting for summary to appear...</Text>
                        )}
                    </Typography>
                </Spin>
            </Modal>
        </>
    );
};

export { SummarizeText };
