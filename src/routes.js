import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Categorias from "./pages/Categorias";
import { Result } from "antd";
import Logo from "./assets/logo-code-pay.png";
import { Layout, Menu, Modal } from "antd";
import { logout, getToken } from "./services/auth";
import PrivateRoute from "./helpers/PrivateRoute";
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

const { Sider } = Layout;

const Routes = () => {
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
    <BrowserRouter>
      <Route exact path="/" component={() => <SignIn />} />
      <StyledLayout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <StyledImage src={Logo} />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<ClusterOutlined />}>
              <Link to="/categorias">Categorias</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingOutlined />}>
              <Link to="/produtos">Produtos</Link>
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
          <StyledContent>
            <PrivateRoute exact path="/home" component={() => <Home />} />
            <PrivateRoute
              exact
              path="/categorias"
              component={() => <Categorias />}
            />
            <PrivateRoute
              exact
              path="/produtos"
              component={() => <Produtos />}
            />
          </StyledContent>
          <StyledFooter>
            Code Pay ©2020 Created by Vitor Carminatti
          </StyledFooter>
        </StyledLayout>
      </StyledLayout>
      <Route
        path="*"
        exact={true}
        component={() => (
          <Result
            status="404"
            title="404"
            subTitle="Desculpe, a página que você visitou não existe."
          />
        )}
      />
    </BrowserRouter>
  );
};

export default Routes;
