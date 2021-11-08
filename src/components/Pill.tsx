import React, { Component, ReactNode } from 'react';

interface Props {
  text: string | number;
  type: 'success' | 'danger' | 'disable';
}

class Pill extends Component<Props> {
  private getStyleFromType() {
    const { type } = this.props;

    switch (type) {
      case 'success': {
        return 'bg-green-500 text-white';
      }
      case 'danger': {
        return 'bg-red-500 text-white';
      }
      case 'disable': {
        return 'bg-gray-500 text-white';
      }
      default: {
        return 'bg-gray-500 text-white';
      }
    }
  }

  public render(): ReactNode {
    const { text } = this.props;

    return (
      <div
        className={'font-bold h-8 w-8 rounded-full inline-flex items-center justify-center ' + this.getStyleFromType()}
      >
        <p>{text}</p>
      </div>
    );
  }
}

export default Pill;
