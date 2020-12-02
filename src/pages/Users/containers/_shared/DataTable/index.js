import React from "react";
import { Link } from "react-router-dom";
import { Divider, Tooltip, Table } from "antd";
import { gql, useQuery } from "@apollo/client";
import { EyeTwoTone, EditTwoTone } from "@ant-design/icons";
import _ from "lodash";

const FETCH_USERS = gql`
  query fetchUsers {
    fetchUsers {
      id
      firstName
      lastName
      role
      authenticationToken
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
    render: (text, record, index) => atob(record.id).replace("User-", ""),
  },
  {
    dataIndex: "firstName",
    title: "Nome",
    align: "left",
    key: "firstName",
    width: "20%",
    sorter: true,
  },
  {
    dataIndex: "lastName",
    title: "Sobrenome",
    align: "left",
    key: "lastName",
    width: "20%",
    sorter: true,
  },
  {
    dataIndex: "role",
    title: "Role",
    align: "left",
    key: "role",
    width: "20%",
    sorter: true,
  },
];

export const DataTable = () => {
  const { data } = useQuery(FETCH_USERS);
  const usuarios = _.get(data, "fetchUsers", null);

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
                <Link to={`/usuarios/${record.authenticationToken}`}>
                  <EyeTwoTone />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="top" title="Editar">
                <Link to={`usuarios/${record.authenticationToken}/edit`}>
                  <EditTwoTone />
                </Link>
              </Tooltip>
            </>
          ),
        },
      ]}
      dataSource={usuarios}
    />
  );
};
