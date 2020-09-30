import React, { useState } from "react";
import Logo from "../../assets/logo-code-pay.png";
import { Layout, Menu, Modal } from "antd";
import { logout, getToken } from "../../services/auth";
import { useHistory } from "react-router-dom";
import {
  StyledImage,
  StyledLayout,
  StyledHeader,
  StyledFooter,
  StyledContent,
  StyledAvatar,
} from "./styles";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const handleOk = () => {
    logout();
    setVisible(false);
    history.push("/");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <StyledLayout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <StyledImage src={Logo} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Produtos
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <StyledLayout>
        <StyledHeader>
          <StyledAvatar
            onClick={() => setVisible(true)}
            size="large"
            icon={<UserOutlined />}
          />
        </StyledHeader>
        <Modal
          okText="Logout"
          cancelText="Cancelar"
          title={`Olá ${getToken().firstName}`}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{`Você é um ${getToken().role}`}</p>
        </Modal>
        <StyledContent>
          <h1>Continuação do site</h1>
        </StyledContent>
        <StyledFooter>Code Pay ©2020 Created by Vitor Carminatti</StyledFooter>
      </StyledLayout>
    </StyledLayout>
  );
};

export default Home;
