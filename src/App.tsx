import Navbar from 'components/Navbar';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import Settings from 'pages/Settings';
import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  public render(): ReactNode {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
