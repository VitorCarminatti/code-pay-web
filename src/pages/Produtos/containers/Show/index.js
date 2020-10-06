import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Modal, Row, Col } from "antd";

const FETCH_PRODUTO = gql`
  query fetchProduto($id: ID!) {
    fetchProduto(id: $id) {
      id
      nome
      preco
      categoria {
        descricao
      }
    }
  }
`;

const Show = ({ history }) => {
  const [visible, setVisible] = React.useState(true);
  const { id } = useParams();
  const { data, loading, error } = useQuery(FETCH_PRODUTO, {
    variables: { id },
  });
  const produto = _.get(data, "fetchProduto", {});

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Modal
      title="Produto"
      wrapClassName="vertical-center-modal"
      maskClosable
      width="30vw"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/produtos")}
    >
      <Row>
        <Col sm={24}>
          <b>ID: </b>
          <p>{produto.id}</p>
          <b>Nome: </b>
          <p>{produto.nome}</p>
          <b>Preço: </b>
          <p>{produto.preco}</p>
          <b>Categoria: </b>
          <p>{produto.categoria.descricao}</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default Show;
