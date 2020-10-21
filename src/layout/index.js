import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-code-pay.png";
import { Layout as AntLayout, Menu, Modal } from "antd";
import { logout, getToken } from "../services/auth";
import {
  StyledImage,
  StyledLayout,
  StyledHeader,
  StyledFooter,
  StyledContent,
  StyledAvatar,
} from "./styles";
import {
  ClusterOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    logout();
    setVisible(false);
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
          <Menu.Item key="1" icon={<ClusterOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ClusterOutlined />}>
            <Link to="/categorias">Categorias</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingOutlined />}>
            <Link to="/produtos">Produtos</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShoppingOutlined />}>
            <Link to="/usuarios">Usuários</Link>
          </Menu.Item>
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
        <StyledContent>{children}</StyledContent>
        <StyledFooter>Code Pay ©2020 Created by Vitor Carminatti</StyledFooter>
      </StyledLayout>
    </StyledLayout>
  );
};

export default Layout;
