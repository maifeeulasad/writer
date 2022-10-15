import React from "react";
import { Footer as AntdFooter } from "antd/lib/layout/layout";

const Footer = () => (
  <AntdFooter>
    <div style={{ textAlign: "center" }}>
      &copy; {new Date().getFullYear()} - Maifee Ul Asad
    </div>
  </AntdFooter>
);

export { Footer };
