import React from "react";
import { Footer as AntdFooter } from "antd/lib/layout/layout";

const Footer = () => (
  <AntdFooter style={{ position: "sticky", bottom: "0" }}>
    <div style={{ textAlign: "center" }}>
      &copy; {new Date().getFullYear()} - Maifee Ul Asad | Commit:{" "} <code>{process.env.REACT_APP_GIT_HASH}</code>
    </div>
  </AntdFooter>
);

export { Footer };
