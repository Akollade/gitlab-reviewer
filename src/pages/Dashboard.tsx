import FavicoMergeRequestsCounter from 'components/FavicoMergeRequestsCounter';
import { GitLabApiContext } from 'components/GitLabApiProvider';
import ProjectList from 'components/Project/ProjectList';
import { UserProvider } from 'components/UserProvider';
import { useContext, useEffect, useState } from 'react';
import LocalStorage from 'services/LocalStorage';
import { Project } from 'types/FormattedTypes';
import { RocketIcon } from 'components/Icons';

const Dashboard = (): JSX.Element | null => {
  const gitLabApi = useContext(GitLabApiContext);

  const [projects, setProjects] = useState<Project[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'GitLab Reviewer';

    const fetchProjects = async (): Promise<void> => {
      if (!gitLabApi) {
        return;
      }

      const projects = await gitLabApi.getProjectsWithMergeRequests();
      setProjects(projects);
      setFetched(true);
    };

    fetchProjects();

    const intervalRef = setInterval(() => {
      fetchProjects();
    }, LocalStorage.getRefreshRateAsNumber() * 60 * 1000);

    return () => {
      clearInterval(intervalRef);
    };
  }, [gitLabApi]);

  if (!gitLabApi || !fetched) {
    return null;
  }

  if (projects.length === 0) {
    return (
      <div className="h-screen -mt-16 flex flex-col justify-center items-center">
        <RocketIcon className="text-10xl text-indigo-200 mb-12" />
        <p className="text-lg">Good job, there is no merge request to review! 🎉</p>
      </div>
    );
  }

  return (
    <UserProvider>
      <ProjectList projects={projects} />
      <FavicoMergeRequestsCounter projects={projects} />
    </UserProvider>
  );
};

export default Dashboard;
