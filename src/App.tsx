import Navbar from 'components/Navbar';
import Dashboard from 'pages/Dashboard';
import NoMatch from 'pages/NoMatch';
import Settings from 'pages/Settings';
import Filters from './pages/Filters';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GitLabApiProvider } from 'components/GitLabApiProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const client = new QueryClient();

const App = (): JSX.Element => {
  return (
    <div className="App">
      <GitLabApiProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/filters" component={Filters} />
              <Route path="/settings" component={Settings} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </QueryClientProvider>
      </GitLabApiProvider>
    </div>
  );
};

export default App;
