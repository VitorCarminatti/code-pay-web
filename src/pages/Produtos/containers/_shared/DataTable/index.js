import React from "react";
import { Link } from "react-router-dom";
import { Popconfirm, Divider, Tooltip, Table } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";
import _ from "lodash";
import { formatDateTime } from "../../../../../services/formatDateTime";

const DESTROY_PRODUTO = gql`
  mutation destroyProduto($id: ID!) {
    destroyProduto(input: { id: $id }) {
      success
      errors
    }
  }
`;

const FETCH_PRODUTOS = gql`
  query fetchProdutos {
    fetchProdutos {
      id
      nome
      preco
      categoria {
        id
        descricao
      }
      createdAt
      updatedAt
    }
  }
`;

const columns = [
  {
    dataIndex: "id",
    title: "ID",
    key: "id",
    align: "left",
    sorter: true,
    width: "5%",
  },
  {
    dataIndex: "nome",
    title: "Nome",
    align: "left",
    key: "nome",
    width: "20%",
    sorter: true,
  },
  {
    dataIndex: "preco",
    title: "Preço",
    align: "left",
    key: "preco",
    width: "20%",
    sorter: true,
  },
  {
    dataIndex: "categoria.descricao",
    title: "Categoria",
    align: "left",
    key: "categoria",
    width: "20%",
    sorter: true,
    render: (text, record, index) => record.categoria.descricao,
  },
  {
    dataIndex: "createdAt",
    title: "Data Criação",
    align: "left",
    key: "createdAt",
    sorter: true,
    width: "10%",
    render: formatDateTime(),
  },
  {
    dataIndex: "updatedAt",
    title: "Data Atualização",
    align: "left",
    key: "updatedAt",
    sorter: true,
    width: "10%",
    render: formatDateTime(),
  },
];

export const DataTable = () => {
  const [destroy] = useMutation(DESTROY_PRODUTO, {
    refetchQueries: ["fetchProdutos"],
  });
  const { data } = useQuery(FETCH_PRODUTOS);
  const produtos = _.get(data, "fetchProdutos", null);

  return (
    <Table
      columns={[
        ...columns,
        {
          width: "10%",
          key: "acoes",
          fixed: "right",
          dataIndex: "",
          render: (record) => (
            <>
              <Tooltip placement="top" title="Detalhes">
                <Link to={`/produtos/${record.id}`}>
                  <EyeTwoTone />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="top" title="Editar">
                <Link to={`produtos/${record.id}/edit`}>
                  <EditTwoTone />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Popconfirm
                title="Tem certeza que deseja deletar esse registro? Essa ação não poderá ser revertida."
                onConfirm={() => destroy({ variables: { id: record.id } })}
                okText="Sim"
                cancelText="Não"
                placement="bottom"
              >
                <Tooltip placement="top" title="Excluir">
                  <Link to=":;">
                    <DeleteTwoTone />
                  </Link>
                </Tooltip>
              </Popconfirm>
            </>
          ),
        },
      ]}
      dataSource={produtos}
    />
  );
};
