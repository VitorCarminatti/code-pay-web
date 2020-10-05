import React, { useState } from "react";
import { Form, Button, Input, Modal, notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";

const CREATE_CATEGORIA = gql`
  mutation CreateCategoria($descricao: String!) {
    createCategoria(input: { descricao: $descricao }) {
      success
      errors
      categoria {
        id
        descricao
      }
    }
  }
`;

const NewCategoria = ({ history }) => {
  const [visible, setVisible] = useState(true);
  const [createCategoria, { data }] = useMutation(CREATE_CATEGORIA, {
    refetchQueries: ["fetchCategorias"],
  });
  const success = _.get(data, "createCategoria.success", null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      descricao: "",
    },
  });

  const onSubmit = async (data) => {
    const { descricao } = data;
    await createCategoria({
      variables: { descricao },
    });

    if (success) {
      setVisible(false);
      notification.success({
        message: "Categoria criada com sucesso!",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Nova Categoria"
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/categorias")}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            {
              required: true,
              message: "Descrição não pode ficar em branco",
            },
          ]}
        >
          <Controller as={<Input />} control={control} name="descricao" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Criar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategoria;
