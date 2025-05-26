interface IGenerateText {
    prompt: string;
    onChunk: (chunk: string) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
}

const writeForMe = async ({ prompt, onChunk, onComplete, onError }: IGenerateText): Promise<void> => {
    try {
        // @ts-ignore
        if (!window.Writer) {
            throw new Error("Writer is not available in the global window object.");
        }
        // @ts-ignore
        const writer = await Writer.create({ tone: "formal", length: "long" });

        const stream = writer.writeStreaming(prompt);

        for await (const chunk of stream) {
            onChunk(chunk);
        }

        onComplete();
    } catch (error) {
        if (error instanceof Error) {
            onError(error);
        } else {
            onError(new Error("An unknown error occurred during text generation."));
        }
    }
};

export { writeForMe };
