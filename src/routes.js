import React from "react";
import { Switch, Route } from "react-router-dom";

import Archive from "./Components/Archive/Archive";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Planet from "./Components/Planet/Planet";
import Star from "./Components/Star/Star";
import Upload from "./Components/Upload/Upload";

export default (
  <Switch>
    <Route component={Auth} exact path="/" />
    <Route component={Archive} path="/archive" />
    <Route component={Star} path="/archive/:systemid" />
    <Route component={Planet} path="/archive/:systemid/:planetid" />
    <Route component={Home} path="/home" />
    <Route component={Upload} path="/upload" />
  </Switch>
);
