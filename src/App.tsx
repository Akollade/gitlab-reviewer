import Navbar from 'components/Navbar';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import Settings from 'pages/Settings';
import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: FunctionComponent = () => {
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
};

export default App;
