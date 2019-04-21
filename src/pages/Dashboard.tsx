import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import MergeRequestList from '../components/MergeRequest/MergeRequestList';
import { createGitLabApi, GitLabApi } from '../services/GitLabApi';
import LocalStorage from '../services/LocalStorage';
import { MergeRequestType } from '../types/MergeRequest';

interface State {
  mergeRequests: MergeRequestType[];
}

class Dashboard extends Component<RouteComponentProps, State> {
  private gitLabApi!: GitLabApi;
  private intervalRef: number | null;

  public state = {
    mergeRequests: []
  };

  constructor(props: RouteComponentProps) {
    super(props);

    this.intervalRef = null;

    try {
      this.gitLabApi = createGitLabApi();
    } catch (error) {
      props.history.push('/settings');
    }
  }

  public async fetchMergeRequests() {
    const mergeRequests = await this.gitLabApi.getMergeRequests();

    this.setState({
      mergeRequests
    });
  }

  public componentDidMount() {
    this.fetchMergeRequests();

    this.intervalRef = window.setInterval(() => {
      this.fetchMergeRequests();
    }, LocalStorage.getRefreshRate() * 60 * 100);
  }

  public componentWillUnmount() {
    if (this.intervalRef) {
      window.clearInterval(this.intervalRef);
    }
  }

  public render() {
    const { mergeRequests } = this.state;

    return <MergeRequestList mergeRequests={mergeRequests} />;
  }
}

export default Dashboard;
