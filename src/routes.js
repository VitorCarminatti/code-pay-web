import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { isAuthenticated } from "./services/auth";
import { Layout, Menu } from "antd";
import Logo from "./assets/logo-code-pay.png";
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
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
              <StyledAvatar size="large" icon={<UserOutlined />} />
            </StyledHeader>
            <StyledContent>
              <PrivateRoute path="/home" component={() => <Home />} />
            </StyledContent>
            <StyledFooter>
              Code Pay ©2020 Created by Vitor Carminatti
            </StyledFooter>
          </StyledLayout>
        </StyledLayout>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
