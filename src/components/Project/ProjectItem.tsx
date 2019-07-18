import Accordion from 'components/Accordion';
import MergeRequestList from 'components/MergeRequest/MergeRequestList';
import React, { Component } from 'react';
import { Project } from 'types/FormattedTypes';

interface Props {
  project: Project;
}

class ProjectItem extends Component<Props> {
  public render() {
    const { project } = this.props;

    return (
      <Accordion
        id={project.id}
        title={project.name_with_namespace}
        content={<MergeRequestList mergeRequests={project.mergeRequests} />}
      />
    );
  }
}

export default ProjectItem;
