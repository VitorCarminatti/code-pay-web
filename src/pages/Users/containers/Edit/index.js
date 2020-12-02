import React, { useState } from "react";
import { Form, Button, Select, Modal, notification } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

const { Option } = Select;

const FETCH_USER = gql`
  query fetchUser($token: String!) {
    fetchUser(token: $token) {
      id
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($authenticationToken: String!, $role: String!) {
    updateUser(
      input: { authenticationToken: $authenticationToken, role: $role }
    ) {
      success
      errors
      user {
        id
        role
      }
    }
  }
`;

const Edit = ({ history }) => {
  let { token } = useParams();
  const [visible, setVisible] = useState(true);

  const [updateUser, { data }] = useMutation(UPDATE_USER, {
    refetchQueries: ["fetchUsers", "fetchUser"],
  });
  const success = _.get(data, "updateUser.success", null);

  const { loading: loadingUser, error: errorUser, data: DataUser } = useQuery(
    FETCH_USER,
    {
      variables: { token },
    }
  );

  const role = _.get(DataUser, "fetchUser.role", "");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      role,
    },
  });

  const onSubmit = async (data) => {
    const { role } = data;
    await updateUser({
      variables: { authenticationToken: token, role },
    });

    if (success) {
      setVisible(false);
      notification.success({
        message: "Usuário alterado com sucesso!",
      });
    }
  };

  if (loadingUser) return "Loading...";
  if (errorUser) return `Error! ${errorUser.message}`;

  return (
    <Modal
      visible={visible}
      title="Editar Usuário"
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/usuarios")}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Role não pode ficar em branco",
            },
          ]}
        >
          <Controller
            as={
              <Select>
                <Option key={1} value={"BAR"}>
                  BAR
                </Option>
                <Option key={2} value={"CAIXA"}>
                  CAIXA
                </Option>
                <Option key={3} value={"CLIENTE"}>
                  CLIENTE
                </Option>
              </Select>
            }
            control={control}
            name="role"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;
