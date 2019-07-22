import React, { Component } from 'react';
import { User } from 'types/GitLabTypes';
import { GitLabApi } from 'services/GitLabApi';

const intialValue: User = {
  id: 0,
  name: "",
  username: "",
  state: "active",
  avatar_url: "",
  web_url: ""
};

export const UserContext: React.Context<User> = React.createContext(intialValue);

interface Props {
  gitLabApi: GitLabApi;
}

export class UserProvider extends React.Component<Props> {

  state = intialValue;

  async updateUser() {
    const user = await this.props.gitLabApi.getUser();

    this.setState(user);
  }

  componentWillMount() {
    this.updateUser();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
