import React from "react";
import { Link } from "react-router-dom";
import { Popconfirm, Divider, Tooltip, Table } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";
import _ from "lodash";
import { formatDateTime } from "../../../../../services/formatDateTime";

const DESTROY_CATEGORIA = gql`
  mutation DestroyCategoria($id: ID!) {
    destroyCategotia(input: { id: $id }) {
      ok
      errors {
        messages
      }
    }
  }
`;

const FETCH_CATEGORIAS = gql`
  query fetchCategorias {
    fetchCategorias {
      id
      descricao
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
    dataIndex: "descricao",
    title: "Descrição",
    align: "left",
    key: "descricao",
    width: "20%",
    sorter: true,
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
  const [destroy] = useMutation(DESTROY_CATEGORIA, {
    refetchQueries: ["fetchCategorias"],
  });
  const { data } = useQuery(FETCH_CATEGORIAS);
  const categorias = _.get(data, "fetchCategorias", null);
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
                <Link to={`/categorias/${record.id}`}>
                  <EyeTwoTone />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="top" title="Editar">
                <Link to={`catagorias/${record.id}/edit`}>
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
      dataSource={categorias}
    />
  );
};
