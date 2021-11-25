import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { createGitLabApi, GitLabApi } from 'services/GitLabApi';

export const GitLabApiContext = React.createContext<GitLabApi | null>(null);

export const GitLabApiProvider: FunctionComponent = ({ children }) => {
  const history = useHistory();
  const [api, setApi] = useState<GitLabApi | null>(null);

  useEffect(() => {
    try {
      setApi(createGitLabApi());
    } catch (error) {
      history.push('/settings');
    }
  }, [history]);

  return <GitLabApiContext.Provider value={api}>{children}</GitLabApiContext.Provider>;
};
