import React from "react";
import Layout from "../../layout";
import { Doughnut } from "react-chartjs-2";
import { Col, Row, Divider, Typography } from "antd";

const { Text } = Typography;

const dataCerveja = {
  labels: ["Skol", "Brahma", "Budweiser", "Sol"],
  datasets: [
    {
      data: [50, 250, 120, 160],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#eb3a34"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#eb3a34"],
    },
  ],
};

const dataVodka = {
  labels: ["Rajska", "Absolut", "Smirnoff"],
  datasets: [
    {
      data: [30, 5, 12],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const dataRefrigerante = {
  labels: ["Coca Cola", "Guaraná", "Pepsi", "Água"],
  datasets: [
    {
      data: [5, 3, 2, 50],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#eb3a34"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#eb3a34"],
    },
  ],
};

const Home = () => (
  <Layout>
    <Divider orientation="left">
      <Text strong>Indicadores</Text>
    </Divider>
    <Row>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        span={8}
      >
        <Text>Cerveja</Text>
        <Doughnut data={dataCerveja} />
      </Col>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        span={8}
      >
        <Text>Vodka</Text>
        <Doughnut data={dataVodka} />
      </Col>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        span={8}
      >
        <Text>Não alcoólicos</Text>
        <Doughnut data={dataRefrigerante} />
      </Col>
    </Row>
  </Layout>
);

export default Home;
