import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Input, Row, Col, Alert, Image } from "antd";
import _ from "lodash";
import Logo from "../../assets/logo-code-pay.png";
import { useForm, Controller } from "react-hook-form";

import { login } from "../../services/auth";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      success
      errors
      user {
        id
        firstName
        role
      }
    }
  }
`;

const SignIn = () => {
  const [signIn, { data: dataLogin }] = useMutation(SIGN_IN);
  const user = _.get(dataLogin, "signIn.user", null);
  const errors = _.get(dataLogin, "signIn.errors", []);
  const success = _.get(dataLogin, "signIn.success", null);
  const history = useHistory();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    await signIn({
      variables: { email, password },
    });

    if (success) {
      login(user);
      history.push("/home");
    }
  };

  return (
    <>
      <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
        <Image width={400} src={Logo} />
        <Col span={6}>
          {errors.length > 0 && (
            <Alert
              message={errors}
              type="error"
              style={{ marginBottom: "5px" }}
            />
          )}
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "E-mail não pode ficar em branco",
                },
              ]}
            >
              <Controller as={<Input />} control={control} name="email" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Senha não pode ficar em branco",
                },
              ]}
            >
              <Controller
                as={<Input.Password />}
                control={control}
                name="password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(onSubmit)}
              >
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
