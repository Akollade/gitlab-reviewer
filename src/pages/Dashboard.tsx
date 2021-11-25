import FavicoMergeRequestsCounter from 'components/FavicoMergeRequestsCounter';
import ProjectList from 'components/Project/ProjectList';
import { UserProvider } from 'components/UserProvider';
import React, { FunctionComponent, useCallback, useEffect, useState} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createGitLabApi, GitLabApi } from 'services/GitLabApi';
import LocalStorage from 'services/LocalStorage';
import { Project } from 'types/FormattedTypes';

const Dashboard: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const gitLabApi = useCallback((): GitLabApi => {
    try {
      return createGitLabApi();
    } catch (error) {
      history.push('/settings');
    }
  }, [history]);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    document.title = 'GitLab Reviewer';

    const fetchProjects = async (): Promise<void> => {
      if (!gitLabApi) {
        return;
      }

      const projects = await gitLabApi().getProjectsWithMergeRequests();

      setProjects(projects);
    };

    fetchProjects();

    const intervalRef = setInterval(() => {
      fetchProjects();
    }, LocalStorage.getRefreshRateAsNumber() * 60 * 1000);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  if (gitLabApi === null || projects.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <UserProvider gitLabApi={gitLabApi()}>
        <ProjectList projects={projects} />
        <FavicoMergeRequestsCounter projects={projects} />
      </UserProvider>
    </React.Fragment>
  );
};

export default Dashboard;
