import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import { MergeRequestType } from '../../types/MergeRequest';

import MergeRequestItem from './MergeRequestItem';

// see https://github.com/ejci/favico.js/issues/126
const Favico = require('favico.js'); 

interface Props {
  mergeRequests: MergeRequestType[];
}

class MergeRequestList extends Component<Props> {
  private favicon: favicojs.Favico;

  public static defaultProps = {
    mergeRequests: []
  };

  constructor(props: Props) {
    super(props);

    this.favicon = new Favico({
        animation: 'fade'
    });
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.mergeRequests.length !== prevProps.mergeRequests.length) {
      this.favicon.badge(this.props.mergeRequests.length);
    }
  }


  public componentWillUnmount() {
    this.favicon.reset();
  }

  public render() {
    const { mergeRequests } = this.props;

    const listItems = mergeRequests.map((mergeRequest: MergeRequestType) => (
      <MergeRequestItem key={mergeRequest.id} mergeRequest={mergeRequest} />
    ));

    return (
      <div className="ml-4">
        <table className="w-full">
          <thead className="text-2xl mb-5">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>
                <FontAwesomeIcon icon={faThumbsUp} size="sm" className="text-green-dark" />
              </th>
              <th>
                <FontAwesomeIcon icon={faThumbsDown} size="sm" className="text-red-dark" />
              </th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  }
}

export default MergeRequestList;
