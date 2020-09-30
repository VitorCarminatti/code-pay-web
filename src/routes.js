import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { isAuthenticated } from "./services/auth";
import { Result } from "antd";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
        <PrivateRoute path="/home" component={() => <Home />} />
        <Route
          path="*"
          component={() => (
            <Result
              status="404"
              title="404"
              subTitle="Desculpe, a página que você visitou não existe."
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
