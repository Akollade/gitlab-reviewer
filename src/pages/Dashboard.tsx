import FavicoMergeRequestsCounter from 'components/FavicoMergeRequestsCounter';
import ProjectList from 'components/Project/ProjectList';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createGitLabApi, GitLabApi } from 'services/GitLabApi';
import LocalStorage from 'services/LocalStorage';
import { Project } from 'types/FormattedTypes';

interface State {
  projects: Project[];
}

class Dashboard extends Component<RouteComponentProps, State> {
  private gitLabApi!: GitLabApi;
  private intervalRef: number | null;

  public state: State = {
    projects: []
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

  public async fetchProjects() {
    const projects = await this.gitLabApi.getBundledProjects();

    this.setState({
      projects
    });
  }

  public componentDidMount() {
    document.title = 'GitLab Reviewer | Dashboard';

    if (!this.gitLabApi) {
      return;
    }

    this.fetchProjects();

    this.intervalRef = window.setInterval(() => {
      this.fetchProjects();
    }, LocalStorage.getRefreshRateAsNumber() * 60 * 1000);
  }

  public componentWillUnmount() {
    if (this.intervalRef) {
      window.clearInterval(this.intervalRef);
    }
  }

  public render() {
    const { projects } = this.state;

    if (projects.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <ProjectList projects={projects} />
        <FavicoMergeRequestsCounter projects={projects} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
