import React from "react";
import { createRoot } from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Content } from "./components/content/Content";

import "./index.css";
import Layout from "antd/lib/layout/layout";
import { App } from "./App";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content>
          <App />
        </Content>
        <Footer />
      </Layout>
    </>
  </React.StrictMode>
);

reportWebVitals();
