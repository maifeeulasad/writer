import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Editor } from "./components/editor";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Content } from "./components/content/Content";

import "antd/dist/antd.min.css";
import "./index.css";
import Layout from "antd/lib/layout/layout";

ReactDOM.render(
  <React.StrictMode>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content>
          <Editor />
        </Content>
        <Footer />
      </Layout>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
