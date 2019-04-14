import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MergeRequestList from './MergeRequestList';
import { MergeRequestType } from './types/MergeRequest';

interface Props {
}

interface State {
  mergeRequests: MergeRequestType[];
}

class App extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      mergeRequests: []
    };
  }

  public async componentDidMount() {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_GITLAB_URL + '/api/v4',
      timeout: 5000,
      headers: {'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN}
    });

    let mergeRequestsResponse = await axiosInstance.get('/merge_requests?state=opened&scope=all&order_by=updated_at');

    this.setState({
      'mergeRequests': mergeRequestsResponse.data
    });
  }

  public render() {
    let { mergeRequests } = this.state ;

    return (
      <div className="App">
        <h1>Gitlab Reviewer</h1>

        <MergeRequestList mergeRequests={mergeRequests} />
      </div>
    );
  }
}

export default App;
