import React from "react";
import { Col, Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

export const ToolBar = () => (
  <Row type="flex" justify="end">
    <Col>
      <Link to={"categorias/new"}>
        <Button type="primary">
          <PlusOutlined />
          Nova Categoria
        </Button>
      </Link>
    </Col>
  </Row>
);
