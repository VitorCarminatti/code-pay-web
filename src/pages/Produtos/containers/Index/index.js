import React from "react";
import { Divider, Col, Row, Typography } from "antd";
import { DataTable } from "../_shared/DataTable";
import { ToolBar } from "../_shared/ToolBar";
const { Text } = Typography;

const Index = () => (
  <Row type="flex">
    <Col xs={24}>
      <ToolBar />
      <Divider orientation="left">
        <Text strong>Produtos</Text>
      </Divider>
      <DataTable />
    </Col>
  </Row>
);

export default Index;
