import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";
import Index from "./containers/Index";

const Categorias = () => (
  <Switch>
    <PrivateRoute path={"/categorias"} component={Index} />
  </Switch>
);

export default Categorias;
