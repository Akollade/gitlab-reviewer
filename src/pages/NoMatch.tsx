import { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NoMatch: FunctionComponent<RouteComponentProps> = (props) => {
  props.history.push('/');

  return null;
};

export default NoMatch;
