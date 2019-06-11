import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/layout";
import Home from "./components/home";
import FullEvent from "./components/fullEventRecord";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/LoginEvent/id=:id" component={FullEvent} />
  </Layout>
);
