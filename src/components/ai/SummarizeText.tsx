import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Spin, Typography, message } from "antd";
import { summarizeForMe } from "../../core/ai/InBrowserAi";

const { Paragraph, Text } = Typography;

interface ISummarizeText {
    getContent: () => string;
    modalVisibility?: boolean;
    setModalVisibility?: (visible: boolean) => void;
    showButton?: boolean;
}

const SummarizeText = ({ getContent, modalVisibility: externalModalVisibility, setModalVisibility: externalSetModalVisibility, showButton = true }: ISummarizeText) => {
    const [internalVisible, setInternalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");

    const visible = externalModalVisibility ?? internalVisible;
    console.log('SummarizeText render - externalModalVisibility:', externalModalVisibility, 'internalVisible:', internalVisible, 'visible:', visible);
    const setVisible = externalSetModalVisibility ?? setInternalVisible;

    const handleSummarize = useCallback(async () => {
        console.log('handleSummarize called');
        const input = getContent();
        console.debug("Input for summarization:", input);
        console.debug("Input length:", input.length);

        // Check if Summarizer API is available
        // @ts-ignore
        if (typeof window !== 'undefined' && !window.Summarizer) {
            console.debug("Summarizer API not available, using fallback");
            // Simple fallback summarization
            const words = input.split(/\s+/).filter(word => word.length > 0);
            const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);

            let summary = `This text contains ${words.length} words and ${sentences.length} sentences. `;

            if (sentences.length > 0) {
                summary += `Key points: ${sentences.slice(0, Math.min(3, sentences.length)).join('. ')}.`;
            }

            setSummary(summary);
            setLoading(false);
            return;
        }

        if (!input || input.trim() === '') {
            message.error("No content to summarize. Please add some text to the editor first.");
            return;
        }

        setSummary("");
        // Only set visible if using internal modal control
        if (externalModalVisibility === undefined) {
            setVisible(true);
        }
        setLoading(true);

        try {
            await summarizeForMe({
                input,
                onChunk: (chunk) => {
                    console.debug("Received chunk:", chunk);
                    setSummary((prev) => prev + chunk);
                },
                onComplete: () => {
                    console.debug("Summarization completed");
                    setLoading(false);
                },
                onError: (err) => {
                    console.error("Error during summarization:", err);
                    setLoading(false);
                    message.error("Summary generation failed.");
                    setSummary("An error occurred during summary generation.");
                },
            });
        } catch (error) {
            console.error("Exception in handleSummarize:", error);
            setLoading(false);
            message.error("Failed to start summarization.");
            setSummary("Failed to start summarization process.");
        }
    }, [getContent, externalModalVisibility, setVisible, setSummary, setLoading]);

    // Auto-start summarization when modal becomes visible (for external modal control)
    useEffect(() => {
        if (visible && externalModalVisibility !== undefined && !loading && !summary) {
            console.log('Modal became visible via external control, starting summarization');
            handleSummarize();
        }
    }, [visible, externalModalVisibility, loading, summary, handleSummarize]);

    // Reset state when modal is closed externally
    useEffect(() => {
        if (!visible && externalModalVisibility !== undefined) {
            console.log('Modal closed externally, resetting state');
            setSummary("");
            setLoading(false);
        }
    }, [visible, externalModalVisibility]);

    return (
        <>
            {showButton && (
                <Button type="primary" onClick={handleSummarize}>
                    Summarize Text
                </Button>
            )}

            <Modal
                title="Summarizing..."
                open={visible}
                onCancel={() => {
                    setVisible(false);
                    setSummary("");
                    setLoading(false);
                }}
                footer={null}
                width={700}
                styles={{ body: { maxHeight: 400, overflowY: "auto" } }}
            >
                <Spin spinning={loading}>
                    <Typography>
                        {summary ? (
                            <Paragraph>
                                {summary.split("\n").map((line, index) => (
                                    <Text key={index}>{line}<br /></Text>
                                ))}
                            </Paragraph>
                        ) : loading ? (
                            <Text type="secondary">Generating summary...</Text>
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
