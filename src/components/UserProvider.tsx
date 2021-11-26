import React, { PropsWithChildren, useEffect, useState } from 'react';
import { User } from 'types/GitLabTypes';
import { GitLabApiContext } from 'components/GitLabApiProvider';

const initialValue: User = {
  id: 0,
  name: '',
  username: '',
  state: 'active',
  avatar_url: '',
  web_url: '',
};

export const UserContext = React.createContext<User>(initialValue);

export const UserProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const gitLabApi = React.useContext(GitLabApiContext);

  const [user, setUser] = useState<User>(initialValue);

  useEffect(() => {
    const updateUser = async (): Promise<void> => {
      if (!gitLabApi) {
        return;
      }

      const user = await gitLabApi.getUser();

      setUser(user);
    };

    updateUser();
  }, [gitLabApi]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
