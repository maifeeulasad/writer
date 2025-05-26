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

interface ISummarizeText {
    input: string;
    onChunk: (chunk: string) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
}

const summarizeForMe = async ({ input, onChunk, onComplete, onError }: ISummarizeText): Promise<void> => {
    try {
        // @ts-ignore
        if (!window.Summarizer) {
            throw new Error("Summarizer is not available in the global window object.");
        }

        const options = {
            sharedContext: "This is a scientific article",
            type: "key-points",
            format: "markdown",
            length: "medium",
        };

        // @ts-ignore
        const availability = await Summarizer.availability();
        let summarizer;

        if (availability === "unavailable") {
            throw new Error("Summarizer API is not available.");
        }

        // @ts-ignore
        summarizer = await Summarizer.create(options);

        if (availability === "requires-download") {
            summarizer.addEventListener("downloadprogress", (e: any) => {
                console.log(`Downloaded ${e.loaded * 100}%`);
            });

            await summarizer.ready;
        }

        const stream = summarizer.summarizeStreaming(input, {
            context: "This article is intended for junior developers.",
        });

        for await (const chunk of stream) {
            onChunk(chunk);
        }

        onComplete();
    } catch (error) {
        if (error instanceof Error) {
            onError(error);
        } else {
            onError(new Error("An unknown error occurred during summarization."));
        }
    }
};

export { writeForMe, summarizeForMe };
