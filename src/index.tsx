import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Editor} from "./components/editor";

import 'antd/dist/antd.min.css';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
