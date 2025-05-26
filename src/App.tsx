import React from 'react';
import { Editor } from './components/editor';
import { GenerateText } from './components/ai/GenerateText';

const App = () => {
    return (
        <div>
            <GenerateText />
            <Editor />
        </div>
    );
}

export { App };