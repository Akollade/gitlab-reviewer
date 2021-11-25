import Accordion from 'components/Accordion';
import MergeRequestList from 'components/MergeRequest/MergeRequestList';
import React, { FunctionComponent } from 'react';
import { Project } from 'types/FormattedTypes';

interface Props {
  project: Project;
}

const ProjectItem: FunctionComponent<Props> = ({ project }) => {
  return (
    <Accordion
      id={project.id}
      title={project.name_with_namespace}
      content={<MergeRequestList mergeRequests={project.mergeRequests} />}
    />
  );
};

export default ProjectItem;
