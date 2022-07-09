import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Editor} from "./components/editor";
import {Header} from "./components/header/Header";

import 'antd/dist/antd.min.css';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Header>
      <Editor />
    </Header>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
