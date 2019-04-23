import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

class NoMatch extends Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);

    props.history.push('/');
  }

  public render() {
    return null;
  }
}

export default NoMatch;
