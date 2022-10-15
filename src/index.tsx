import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Editor } from "./components/editor";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Content } from "./components/content/Content";

import "antd/dist/antd.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <>
      <Header />
      <Content>
        <Editor />
      </Content>
      <Footer/>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
