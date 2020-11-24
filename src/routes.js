import React from "react";
import { Switch, Route } from "react-router-dom";

import Archive from "./Components/Archive/Archive";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import PlanetPage from "./Components/Archive/Planet/PlanetPage";
import StarPage from "./Components/Archive/Star/StarPage";
import Upload from "./Components/Upload/Upload";

export default (
  <Switch>
    <Route component={Auth} exact path="/" />
    <Route component={PlanetPage} path="/archive/planets/:planetid" />
    <Route component={StarPage} path="/archive/:starid" />
    <Route component={Archive} path="/archive" />
    <Route component={Home} path="/home" />
    <Route component={Upload} path="/upload" />
  </Switch>
);
