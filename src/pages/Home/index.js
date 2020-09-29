import React from "react";
import { Button } from "antd";
import { logout } from "../../services/auth";

const Home = () => <Button onClick={() => logout()}>Logout</Button>;

export default Home;
