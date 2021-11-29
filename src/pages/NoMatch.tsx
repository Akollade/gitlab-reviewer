import { RouteComponentProps } from 'react-router-dom';

const NoMatch = ({ history }: RouteComponentProps): null => {
  history.push('/');

  return null;
};

export default NoMatch;
