import React from "react";
import PageHeader from "antd/lib/page-header";

interface MyProps {}

class Header extends React.Component<MyProps, {}> {
  render() {
    return (
      <PageHeader
        title="Writer"
        subTitle="Just keep writing, with a little help"
      >
        {this.props.children}
      </PageHeader>
    );
  }
}

export { Header };
