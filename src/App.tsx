import Navbar from 'components/Navbar';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import Settings from 'pages/Settings';
import { FunctionComponent } from 'react';
import { GitLabApiProvider } from 'components/GitLabApiProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Router>
        <GitLabApiProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </GitLabApiProvider>
      </Router>
    </div>
  );
};

export default App;
