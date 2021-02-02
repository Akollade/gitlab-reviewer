import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GitLabApi } from 'services/GitLabApi';
import LocalStorage from 'services/LocalStorage';

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
    refreshRate: LocalStorage.getRefreshRate(),
    error: false,
  };

  constructor(props: RouteComponentProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount(): void {
    document.title = 'GitLab Reviewer | Settings';
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value } as Pick<State, 'url' | 'privateToken' | 'refreshRate'>);
  }

  public async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { url, privateToken, refreshRate } = this.state;

    const isAuthenticated = await new GitLabApi(url, privateToken).isAuthenticated();

    if (isAuthenticated) {
      LocalStorage.setUrl(url);
      LocalStorage.setPrivateToken(privateToken);
      LocalStorage.setRefreshRate(refreshRate);

      this.props.history.push('/');
    } else {
      this.setState({ error: true });
    }
  }

  public render(): JSX.Element {
    const { url, privateToken, refreshRate, error } = this.state;

    return (
      <div className="max-w-xl mx-auto mt-5">
        <h1 className="text-3xl font-semibold">Settings</h1>

        <form className="mt-16 flex-col justify-center" onSubmit={this.handleSubmit}>
          <div className="flex items-center mb-4">
            <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="url">
              GitLab url
            </label>
            <input
              className="w-3/5"
              type="url"
              name="url"
              placeholder="https://gitlab.example.com"
              defaultValue={url}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="token">
              Private token
            </label>
            <input
              className="w-3/5"
              type="text"
              name="privateToken"
              defaultValue={privateToken}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="refresh_rate">
              Refresh rate (minutes)
            </label>
            <input
              className="w-3/5"
              type="number"
              name="refreshRate"
              defaultValue={refreshRate}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex justify-center mt-6">
            <div className="w-2/5" />
            <div className="w-3/5 flex-col">
              <input
                className="py-2 px-6 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
                type="submit"
                value="Save"
              />
              {error && (
                <div className="mt-4 border-red-500 border border-solid rounded py-2 px-4 bg-white">
                  <p>
                    Authentication failed{' '}
                    <span role="img" aria-label="Disappointed Face">
                      😞
                    </span>
                    .
                  </p>
                  <p>Check your url and token.</p>
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
