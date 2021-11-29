import FavicoMergeRequestsCounter from 'components/FavicoMergeRequestsCounter';
import { GitLabApiContext } from 'components/GitLabApiProvider';
import ProjectList from 'components/Project/ProjectList';
import { UserProvider } from 'components/UserProvider';
import { useContext, useEffect, useState } from 'react';
import LocalStorage from 'services/LocalStorage';
import { Project } from 'types/FormattedTypes';

const Dashboard = (): JSX.Element | null => {
  const gitLabApi = useContext(GitLabApiContext);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    document.title = 'GitLab Reviewer';

    const fetchProjects = async (): Promise<void> => {
      if (!gitLabApi) {
        return;
      }

      const projects = await gitLabApi.getProjectsWithMergeRequests();

      setProjects(projects);
    };

    fetchProjects();

    const intervalRef = setInterval(() => {
      fetchProjects();
    }, LocalStorage.getRefreshRateAsNumber() * 60 * 1000);

    return () => {
      clearInterval(intervalRef);
    };
  }, [gitLabApi]);

  if (!gitLabApi || projects.length === 0) {
    return null;
  }

  return (
    <UserProvider>
      <ProjectList projects={projects} />
      <FavicoMergeRequestsCounter projects={projects} />
    </UserProvider>
  );
};

export default Dashboard;
