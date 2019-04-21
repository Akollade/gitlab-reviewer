import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

class App extends Component {
  public render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
