import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.min.css';
import './index.css'
import {Home} from "./components/home";

ReactDOM.render(
  <React.StrictMode>
      <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
