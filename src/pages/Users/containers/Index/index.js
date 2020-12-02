import React from "react";
import { Divider, Col, Row, Typography } from "antd";
import { DataTable } from "../_shared/DataTable";
const { Text } = Typography;

const Index = () => (
  <Row type="flex">
    <Col xs={24}>
      <Divider orientation="left">
        <Text strong>Usuários</Text>
      </Divider>
      <DataTable />
    </Col>
  </Row>
);

export default Index;
