import React, { useState } from "react";
import "../../common.scss";
import "./mainLayout.scss";
import { Layout, Collapse } from "antd";
import TopHeader from "../header/TopHeader";
import Side from "../side/Side";
import MainContent from "../content/MainContent";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  return (
    <>
      <Layout>
        <Header className="headerStyle">
          <TopHeader />
        </Header>
        <Layout hasSider>
          <Sider className="siderStyle">
            <Side onTimeSelect={handleTimeSelection} />
          </Sider>

          <Content className="contentStyle">
            <MainContent selectedTime={selectedTime} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MainLayout;
