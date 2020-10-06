import styled from "styled-components";
import { Image, Layout, Avatar } from "antd";

const { Content, Footer, Header } = Layout;

export const StyledImage = styled(Image)`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

export const StyledLayout = styled(Layout)`
  background: #fff;
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
`;

export const StyledContent = styled(Content)`
  margin: 0 16px;
`;

export const StyledAvatar = styled(Avatar)`
  margin: 10px;
`;
