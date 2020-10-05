import React, { useState } from "react";
import { Form, Button, Input, Modal, notification } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

const FETCH_CATEGORIA = gql`
  query fetchCategoria($id: ID!) {
    fetchCategoria(id: $id) {
      id
      descricao
    }
  }
`;

const UPDATE_CATEGORIA = gql`
  mutation updateCategoria($id: ID!, $descricao: String!) {
    updateCategoria(input: { id: $id, descricao: $descricao }) {
      success
      errors
      categoria {
        id
        descricao
      }
    }
  }
`;

const EditCategoria = ({ history }) => {
  let { id } = useParams();
  const [visible, setVisible] = useState(true);
  const [updateCategoria, { data }] = useMutation(UPDATE_CATEGORIA, {
    refetchQueries: ["fetchCategorias", "fetchCategoria"],
  });
  const success = _.get(data, "updateCategoria.success", null);

  const { data: DataCategoria } = useQuery(FETCH_CATEGORIA, {
    variables: { id },
  });

  const descricao = _.get(DataCategoria, "fetchCategoria.descricao", "");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      descricao,
    },
  });

  const onSubmit = async (data) => {
    const { descricao } = data;
    await updateCategoria({
      variables: { id, descricao },
    });

    if (success) {
      setVisible(false);
      notification.success({
        message: "Categoria alterada com sucesso!",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Editar Categoria"
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
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoria;
