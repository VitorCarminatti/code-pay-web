import React from "react";
import { Col, Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

export const ToolBar = () => (
  <Row type="flex" justify="end">
    <Col>
      <Link to={"produtos/new"}>
        <Button type="primary">
          <PlusOutlined />
          Novo Produto
        </Button>
      </Link>
    </Col>
  </Row>
);
