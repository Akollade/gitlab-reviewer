import { useEffect } from 'react';
import { Project } from 'types/FormattedTypes';

// see https://github.com/ejci/favico.js/issues/126
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Favico = require('favico.js');

function getMergeRequestsCount(projects: Project[]): number {
  return projects.reduce<number>(
    (counter: number, project: Project): number => counter + project.mergeRequests.length,
    0
  );
}

interface Props {
  projects: Project[];
}

const FavicoMergeRequestsCounter = ({ projects }: Props): JSX.Element | null => {
  useEffect(() => {
    const favicon: favicojs.Favico = new Favico({ animation: 'fade' });
    const mergeRequestsLength = getMergeRequestsCount(projects);
    favicon.badge(mergeRequestsLength);

    return () => {
      favicon.reset();
    };
  }, [projects]);

  return null;
};

export default FavicoMergeRequestsCounter;
