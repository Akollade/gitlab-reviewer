import React, { Component, ReactNode } from 'react';
import { GitLabApi } from 'services/GitLabApi';
import { User } from 'types/GitLabTypes';

const initialValue: User = {
  id: 0,
  name: '',
  username: '',
  state: 'active',
  avatar_url: '',
  web_url: '',
};

export const UserContext: React.Context<User> = React.createContext(initialValue);

interface Props {
  gitLabApi: GitLabApi;
}

export class UserProvider extends Component<Props> {
  public state = initialValue;

  public async updateUser(): Promise<void> {
    const user = await this.props.gitLabApi.getUser();

    this.setState(user);
  }

  public componentDidMount(): void {
    this.updateUser();
  }

  public render(): ReactNode {
    return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
  }
}
