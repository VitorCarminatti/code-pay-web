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
import { useParams } from "react-router-dom";

const { Option } = Select;

const FETCH_PRODUTO = gql`
  query fetchProduto($id: ID!) {
    fetchProduto(id: $id) {
      id
      nome
      preco
      categoriaId
      categoria {
        id
        descricao
      }
    }
  }
`;

const UPDATE_PRODUTO = gql`
  mutation updateProduto(
    $id: ID!
    $nome: String!
    $preco: String!
    $categoriaId: ID!
  ) {
    updateProduto(
      input: { id: $id, nome: $nome, preco: $preco, categoriaId: $categoriaId }
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

const EditProduto = ({ history }) => {
  let { id } = useParams();
  const [visible, setVisible] = useState(true);

  const { loading, error, data: dataCategorias } = useQuery(FETCH_CATEGORIAS);
  const categorias = _.get(dataCategorias, "fetchCategorias", null);

  const [updateProduto, { data }] = useMutation(UPDATE_PRODUTO, {
    refetchQueries: ["fetchProdutos", "fetchProduto"],
  });
  const success = _.get(data, "updateProduto.success", null);

  const {
    loading: loadingProduto,
    error: errorProduto,
    data: DataProduto,
  } = useQuery(FETCH_PRODUTO, {
    variables: { id },
  });

  const nome = _.get(DataProduto, "fetchProduto.nome", "");
  const preco = _.get(DataProduto, "fetchProduto.preco", "");
  const categoriaId = _.get(DataProduto, "fetchProduto.categoriaId", "");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome,
      preco,
      categoriaId,
    },
  });

  const onSubmit = async (data) => {
    const { nome, preco, categoriaId } = data;
    await updateProduto({
      variables: { id, nome, preco, categoriaId },
    });

    if (success) {
      setVisible(false);
      notification.success({
        message: "Produto alterado com sucesso!",
      });
    }
  };

  if (loading || loadingProduto) return "Loading...";
  if (error || errorProduto) return `Error! ${error.message}`;

  return (
    <Modal
      visible={visible}
      title="Editar Produto"
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
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduto;
