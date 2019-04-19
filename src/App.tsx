import axios from 'axios';
import React, { Component } from 'react';

import MergeRequestList from './components/MergeRequest/MergeRequestList';
import Navbar from './components/Navbar';
import { MergeRequestType } from './types/MergeRequest';

interface Props {}

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
      headers: { 'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_TOKEN }
    });

    const mergeRequestsResponse = await axiosInstance.get('/merge_requests?state=opened&scope=all&order_by=updated_at');

    this.setState({
      mergeRequests: mergeRequestsResponse.data
    });
  }

  public render() {
    const { mergeRequests } = this.state;

    return (
      <div className="App">
        <Navbar />
        <MergeRequestList mergeRequests={mergeRequests} />
      </div>
    );
  }
}

export default App;
