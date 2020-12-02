import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Modal, Row, Col } from "antd";

const FETCH_USER = gql`
  query fetchUser($token: String!) {
    fetchUser(token: $token) {
      id
      firstName
      lastName
      role
    }
  }
`;

const Show = ({ history }) => {
  const [visible, setVisible] = React.useState(true);
  const { token } = useParams();
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { token },
  });
  const usuario = _.get(data, "fetchUser", {});

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Modal
      title="Usuário"
      wrapClassName="vertical-center-modal"
      maskClosable
      width="30vw"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/usuarios")}
    >
      <Row>
        <Col sm={24}>
          <b>ID: </b>
          <p>{atob(usuario.id)}</p>
          <b>Nome: </b>
          <p>{usuario.firstName}</p>
          <b>Sobrenome: </b>
          <p>{usuario.lastName}</p>
          <b>Role: </b>
          <p>{usuario.role}</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default Show;
