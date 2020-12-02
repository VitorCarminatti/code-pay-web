import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PrivateRoute from "./helpers/PrivateRoute";

import Categorias from "./pages/Categorias";
import NewCategoria from "./pages/Categorias/containers/New";
import EditCategoria from "./pages/Categorias/containers/Edit";
import ShowCategoria from "./pages/Categorias/containers/Show";

import Produtos from "./pages/Produtos";
import NewProduto from "./pages/Produtos/containers/New";
import EditProduto from "./pages/Produtos/containers/Edit";
import ShowProduto from "./pages/Produtos/containers/Show";

import Users from "./pages/Users";
import ShowUsuario from "./pages/Users/containers/Show";
import EditUsuario from "./pages/Users/containers/Edit";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/categorias" component={Categorias} />
        <PrivateRoute path="/categorias/new" component={NewCategoria} />
        <PrivateRoute path="/categorias/:id/edit" component={EditCategoria} />
        <PrivateRoute path="/categorias/:id" component={ShowCategoria} />
        <PrivateRoute exact path="/produtos" component={Produtos} />
        <PrivateRoute path="/produtos/new" component={NewProduto} />
        <PrivateRoute path="/produtos/:id/edit" component={EditProduto} />
        <PrivateRoute path="/produtos/:id" component={ShowProduto} />
        <PrivateRoute exact path="/usuarios" component={Users} />
        <PrivateRoute path="/usuarios/:token/edit" component={EditUsuario} />
        <PrivateRoute path="/usuarios/:token" component={ShowUsuario} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
