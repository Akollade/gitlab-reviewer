import { DownvoteIcon, UpvoteIcon } from 'components/Icons';
import ProjectItem from 'components/Project/ProjectItem';
import { Project } from 'types/FormattedTypes';

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects = [] }: Props): JSX.Element => {
  const listItems = projects.map((project: Project) => <ProjectItem key={project.id} project={project} />);

  return (
    <div className="m-5">
      <div className="bg-white mt-5 shadow-md rounded py-2">
        <table className="w-full">
          <thead className="text-gray-600">
            <tr>
              <th className="uppercase pl-4 p-0">Title</th>
              <th className="w-32 text-center uppercase p-0">Author</th>
              <th className="w-24 text-center uppercase p-0">My vote</th>
              <th className="w-24 text-xl text-center p-0">
                <UpvoteIcon />
              </th>
              <th className="w-24 text-xl text-center p-0">
                <DownvoteIcon />
              </th>
              <th className="w-32 text-center py-1 p-0">CI</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>{listItems}</div>
    </div>
  );
};

export default ProjectList;
