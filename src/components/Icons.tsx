import {
  FaSymbol,
  FlipProp,
  IconProp,
  PullProp,
  RotateProp,
  SizeProp,
  Transform
} from '@fortawesome/fontawesome-svg-core';
import { faQuestion, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

const defaultSize = 'sm';

interface Props {
  mask?: IconProp;
  className?: string;
  color?: string;
  spin?: boolean;
  pulse?: boolean;
  border?: boolean;
  fixedWidth?: boolean;
  inverse?: boolean;
  listItem?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotation?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
  style?: CSSProperties;
  tabIndex?: number;
  title?: string;
}

interface FullProps extends Props {
  icon: IconProp;
}

const IconGenerator = (props: FullProps) => <FontAwesomeIcon size={props.size || defaultSize} {...props} />;

export const UpvoteIcon = (props: Props) => <IconGenerator icon={faThumbsUp} {...props} className="text-green-600" />;

export const DownvoteIcon = (props: Props) => <IconGenerator icon={faThumbsDown} {...props} className="text-red-600" />;

export const QuestionIcon = (props: Props) => <IconGenerator icon={faQuestion} {...props} className="text-gray-600" />;
