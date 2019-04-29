import MergeRequestList from 'components/MergeRequest/MergeRequestList';
import React, { Component } from 'react';
import { Project } from 'types/FormattedTypes';
import Accordion from 'components/Accordion';

interface Props {
  project: Project;
}

class ProjectItem extends Component<Props> {
  public render() {
    const { project } = this.props;

    return (
      <Accordion
        title={project.name_with_namespace}
        content={(<MergeRequestList mergeRequests={project.mergeRequests} />)}
      />
    );
  }
}

export default ProjectItem;
