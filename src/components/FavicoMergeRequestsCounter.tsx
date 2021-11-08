import { Component, ReactNode } from 'react';
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

class FavicoMergeRequestsCounter extends Component<Props> {
  private favicon: favicojs.Favico = new Favico({ animation: 'fade' });

  public componentDidMount(): void {
    const mergeRequestsLength = getMergeRequestsCount(this.props.projects);
    this.favicon.badge(mergeRequestsLength);
  }

  public componentDidUpdate({ projects: prevProjects }: Props): void {
    const oldMergeRequestsLength = getMergeRequestsCount(prevProjects);
    const newMergeRequestsLength = getMergeRequestsCount(this.props.projects);

    if (newMergeRequestsLength !== oldMergeRequestsLength) {
      this.favicon.badge(newMergeRequestsLength);
    }
  }

  public componentWillUnmount(): void {
    this.favicon.reset();
  }

  public render(): ReactNode {
    return null;
  }
}

export default FavicoMergeRequestsCounter;
