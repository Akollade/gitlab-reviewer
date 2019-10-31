import ProjectItem from 'components/Project/ProjectItem';
import { DownvoteIcon, UpvoteIcon } from 'components/Icons';
import React, { Component } from 'react';
import { Project } from 'types/FormattedTypes';

interface Props {
  projects: Project[];
}

class ProjectList extends Component<Props> {
  public static defaultProps: Props = {
    projects: []
  };

  public render() {
    const { projects } = this.props;

    const listItems = projects.map((project: Project) => <ProjectItem key={project.id} project={project} />);

    return (
      <div className="mx-4">
        <div className="bg-white mt-5 shadow rounded py-2">
          <table className="w-full">
            <thead className="text-gray-600">
              <tr>
                <th className="uppercase pl-4 p-0">Title</th>
                <th className="w-32 text-center uppercase p-0">Author</th>
                <th className="w-24 text-center uppercase p-0">My vote</th>
                <th className="w-24 text-lg text-center p-0">
                  <UpvoteIcon />
                </th>
                <th className="w-24 text-lg text-center p-0">
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
  }
}

export default ProjectList;
