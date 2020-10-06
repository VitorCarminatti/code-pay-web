import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  Modal,
  notification,
} from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";

const { Option } = Select;

const CREATE_PRODUTO = gql`
  mutation CreateProduto($nome: String!, $preco: String!, $categoriaId: ID!) {
    createProduto(
      input: { nome: $nome, preco: $preco, categoriaId: $categoriaId }
    ) {
      success
      errors
      produto {
        id
        nome
        preco
        categoria {
          id
          descricao
        }
      }
    }
  }
`;

const FETCH_CATEGORIAS = gql`
  query fetchCategorias {
    fetchCategorias {
      id
      descricao
    }
  }
`;

const NewProduto = ({ history }) => {
  const [visible, setVisible] = useState(true);

  const { data: dataCategorias } = useQuery(FETCH_CATEGORIAS);
  const categorias = _.get(dataCategorias, "fetchCategorias", null);

  const [createProduto, { data }] = useMutation(CREATE_PRODUTO, {
    refetchQueries: ["fetchProdutos"],
  });
  const success = _.get(data, "createProduto.success", null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      preco: "",
      categoriaId: "",
    },
  });

  const onSubmit = async (data) => {
    const { nome, preco, categoriaId } = data;
    await createProduto({
      variables: { nome, preco, categoriaId },
    });

    if (success) {
      setVisible(false);
      notification.success({
        message: "Produto criado com sucesso!",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Novo Produto"
      footer={false}
      onCancel={() => setVisible(false)}
      afterClose={() => history.push("/produtos")}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[
            {
              required: true,
              message: "Nome não pode ficar em branco",
            },
          ]}
        >
          <Controller as={<Input />} control={control} name="nome" />
        </Form.Item>
        <Form.Item
          label="Preço"
          name="preco"
          rules={[
            {
              required: true,
              message: "Preço não pode ficar em branco",
            },
          ]}
        >
          <Controller as={<InputNumber />} control={control} name="preco" />
        </Form.Item>
        <Form.Item
          label="Categoria"
          name="categoriaId"
          rules={[
            {
              required: true,
              message: "Categoria não pode ficar em branco",
            },
          ]}
        >
          <Controller
            as={
              <Select>
                {categorias.map((categoria, index) => (
                  <Option key={index} value={categoria.id}>
                    {categoria.descricao}
                  </Option>
                ))}
              </Select>
            }
            control={control}
            name="categoriaId"
          />
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

export default NewProduto;
