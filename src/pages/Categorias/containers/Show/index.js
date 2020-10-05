import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Modal, Row, Col } from "antd";

const FETCH_CATEGORIA = gql`
  query fetchCategoria($id: ID!) {
    fetchCategoria(id: $id) {
      id
      descricao
    }
  }
`;

const Show = ({ history }) => {
  const [visible, setVisible] = React.useState(true);
  const { id } = useParams();
  const { data } = useQuery(FETCH_CATEGORIA, {
    variables: { id },
  });
  const categoria = _.get(data, "fetchCategoria", {});

  return (
    <Modal
      title="Categoria"
      wrapClassName="vertical-center-modal"
      maskClosable
      width="30vw"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/categorias")}
    >
      <Row>
        <Col sm={24}>
          <b>ID: </b>
          <p>{categoria.id}</p>
          <b>Descrição: </b>
          <p>{categoria.descricao}</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default Show;
