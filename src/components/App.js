/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";


import PricePage from "./PricePage";

import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          
          <NavLink to="/" activeStyle={activeStyle}>Demo App</NavLink>
          

        </div>
        <Switch>
          
          <Route path="/" component={PricePage} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
