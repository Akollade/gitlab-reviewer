import axios from 'axios';
import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { createGitLabApi } from '../services/GitLabApi';
import LocalStorage from '../services/LocalStorage';

interface State {
  url: string;
  privateToken: string;
  refreshRate: string;
  error: boolean;
}

class Settings extends Component<RouteComponentProps, State> {
  public state = {
    url: LocalStorage.getUrl() || '',
    privateToken: LocalStorage.getPrivateToken() || '',
    refreshRate: LocalStorage.getRefreshRateAsString(),
    error: false
  };

  constructor(props: RouteComponentProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
    document.title = 'GitLab Reviewer | Settings';
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value } as Pick<State, 'url' | 'privateToken' | 'refreshRate'>);
  }

  public async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { url, privateToken, refreshRate } = this.state;

    const isAuthenticated = await createGitLabApi(url, privateToken).isAuthenticated();

    if (isAuthenticated) {
      LocalStorage.setUrl(url);
      LocalStorage.setPrivateToken(privateToken);
      LocalStorage.setRefreshRate(refreshRate);

      this.props.history.push('/');
    } else {
      this.setState({ error: true });
    }
  }

  public render() {
    const { url, privateToken, refreshRate, error } = this.state;

    return (
      <div className="container mt-4 w-5/6">
        <h1>Settings</h1>

        <form className="mt-6 flex-col justify-center" onSubmit={this.handleSubmit}>
          <div className="flex items-center mb-4">
            <label className="w-1/2 text-right mr-6 font-semibold text-lg" htmlFor="url">
              GitLab url
            </label>
            <input className="w-4/5" type="url" name="url" defaultValue={url} onChange={this.handleChange} required />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/2 text-right mr-6 font-semibold text-lg" htmlFor="token">
              Private token
            </label>
            <input
              className="w-4/5"
              type="text"
              name="privateToken"
              defaultValue={privateToken}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/2 text-right mr-6 font-semibold text-lg" htmlFor="refresh_rate">
              Refresh rate (minutes)
            </label>
            <input
              className="w-4/5"
              type="text"
              name="refreshRate"
              defaultValue={refreshRate}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex justify-center mt-6">
            <div className="w-1/2 mr-6" />
            <div className="w-4/5 flex-col">
              <input
                className="py-2 px-6 bg-blue text-white hover:bg-white hover:text-blue cursor-pointer"
                type="submit"
                value="Save"
              />
              {error && (
                <div className="mt-4 border-red border-1 border-solid rounded py-2 px-4 bg-white">
                  <p>Authentication failed 😞.</p>
                  <p>Check your url and token 🙂.</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
