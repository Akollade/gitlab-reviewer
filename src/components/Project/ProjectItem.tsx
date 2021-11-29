import Accordion from 'components/Accordion';
import MergeRequestList from 'components/MergeRequest/MergeRequestList';
import { Project } from 'types/FormattedTypes';

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props): JSX.Element => {
  return (
    <Accordion
      id={project.id}
      title={project.name_with_namespace}
      content={<MergeRequestList mergeRequests={project.mergeRequests} />}
    />
  );
};

export default ProjectItem;
