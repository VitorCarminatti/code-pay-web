import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Table } from "antd";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const GET_USERS = gql`
  query GetUsers {
    fetchUsers {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

const Users = () => (
  <Query query={GET_USERS}>
    {({ loading, data }) => {
      return (
        !loading && <Table dataSource={data.fetchUsers} columns={columns} />
      );
    }}
  </Query>
);

export default Users;
