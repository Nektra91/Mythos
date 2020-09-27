import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import About from './containers/About/About';
import Apply from './containers/Apply/Apply';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/apply" component={Apply} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
