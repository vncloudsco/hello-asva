import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      {/* <Route path={`${match.url}user`} component={User} />
      <Route path={`${match.url}user`} component={User} />
      <Route path={`${match.url}user`} component={User} /> */}
    </Switch>
  </div>
);

export default App;
