import { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

class NoMatch extends Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);

    props.history.push('/');
  }

  public render(): ReactNode {
    return null;
  }
}

export default NoMatch;
