import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MergeRequestList from './MergeRequestList';

interface Props {
}

interface State {
  merge_requests: any;
}

class App extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      merge_requests: []
    };
  }

  public componentDidMount() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_GITLAB_URL + '/api/v4',
      timeout: 1000,
      headers: {'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN}
    });

    var self = this;

    instance.get('/merge_requests?state=opened&scope=all&order_by=updated_at').then(function (response) {
      self.setState({
        'merge_requests': response.data
      });
    })
  }

  public render() {
    let { merge_requests } = this.state ;

    return (
      <div className="App">
        <h1>Gitlab Reviewer</h1>

        <MergeRequestList mergeRequests={merge_requests} />
      </div>
    );
  }
}

export default App;
