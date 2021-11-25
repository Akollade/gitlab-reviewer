import React, { FunctionComponent, useEffect, useState } from 'react';
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

export const UserProvider: FunctionComponent<Props> = ({ gitLabApi, children }) => {
  const [user, setUser] = useState<User>(initialValue);

  useEffect(() => {
    const updateUser = async (): Promise<void> => {
      const user = await gitLabApi.getUser();

      setUser(user);
    };

    updateUser();
  }, [gitLabApi]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
