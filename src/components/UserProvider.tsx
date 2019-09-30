import React from 'react';
import { GitLabApi } from 'services/GitLabApi';
import { User } from 'types/GitLabTypes';

const intialValue: User = {
  id: 0,
  name: '',
  username: '',
  state: 'active',
  avatar_url: '',
  web_url: ''
};

export const UserContext: React.Context<User> = React.createContext(intialValue);

interface Props {
  gitLabApi: GitLabApi;
}

export class UserProvider extends React.Component<Props> {
  public state = intialValue;

  public async updateUser() {
    const user = await this.props.gitLabApi.getUser();

    this.setState(user);
  }

  public componentDidMount() {
    this.updateUser();
  }

  public render() {
    return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
  }
}
