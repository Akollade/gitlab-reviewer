import { Component } from 'react';
import { Project } from 'types/FormattedTypes';

// see https://github.com/ejci/favico.js/issues/126
const Favico = require('favico.js');

interface Props {
  projects: Project[];
}

class FavicoMergeRequestsCounter extends Component<Props> {
  private favicon: favicojs.Favico = new Favico({ animation: 'fade' });

  private static getMergeRequestsCount(projects: Project[]): number {
    return projects.reduce<number>(
      (counter: number, project: Project): number => counter + project.mergeRequests.length,
      0
    );
  }

  public componentDidMount() {
    const mergeRequestsLength = FavicoMergeRequestsCounter.getMergeRequestsCount(this.props.projects);
    this.favicon.badge(mergeRequestsLength);
  }

  public componentDidUpdate({ projects: prevProjects }: Props) {
    const oldMergeRequestsLength = FavicoMergeRequestsCounter.getMergeRequestsCount(prevProjects);
    const newMergeRequestsLength = FavicoMergeRequestsCounter.getMergeRequestsCount(this.props.projects);

    if (newMergeRequestsLength !== oldMergeRequestsLength) {
      this.favicon.badge(newMergeRequestsLength);
    }
  }

  public componentWillUnmount() {
    this.favicon.reset();
  }

  public render() {
    return null;
  }
}

export default FavicoMergeRequestsCounter;
