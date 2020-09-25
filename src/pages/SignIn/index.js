import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Input, Row, Col, Alert, Image } from "antd";
import _ from "lodash";
import Logo from "../../assets/logo-code-pay.png";

import { login } from "../../services/auth";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      success
      errors
      user {
        authenticationToken
      }
    }
  }
`;

const SignIn = () => {
  const [signIn, { data }] = useMutation(SIGN_IN);
  const token = _.get(data, "signIn.autenticationToken", null);
  const errors = _.get(data, "signIn.errors", false);
  const history = useHistory();

  return (
    <>
      <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
        <Image width={400} src={Logo} />
        <Col span={6}>
          {errors && <Alert message={errors} type="error" />}
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={(values) => {
              signIn({
                variables: { email: values.email, password: values.password },
              });
              if (errors) {
                login(token);
                history.push("/app");
              }
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email não pode ficar em branco" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                { required: true, message: "Senha não pode ficar em branco!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(SignIn);
