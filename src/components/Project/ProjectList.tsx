import ProjectItem from 'components/Project/ProjectItem';
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

    return <div>{listItems}</div>;
  }
}

export default ProjectList;
