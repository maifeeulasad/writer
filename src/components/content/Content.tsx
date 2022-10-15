import React from "react";

import { Content as AntdContent } from "antd/lib/layout/layout";

interface IPropsContent {}

class Content extends React.Component<IPropsContent> {
  render() {
    return (
      <div style={{ margin: "20px", height: "80%", flex: "grow" }}>
        <AntdContent>{this.props.children}</AntdContent>
      </div>
    );
  }
}

export { Content };
