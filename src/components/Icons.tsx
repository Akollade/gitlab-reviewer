import {
  FaSymbol,
  FlipProp,
  IconProp,
  PullProp,
  RotateProp,
  SizeProp,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import { faMinus, faRocket, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
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

export const UpvoteIcon = (props: Props): JSX.Element => (
  <IconGenerator icon={faThumbsUp} {...props} className="text-green-500" />
);

export const DownvoteIcon = (props: Props): JSX.Element => (
  <IconGenerator icon={faThumbsDown} {...props} className="text-red-500" />
);

export const MinusIcon = (props: Props): JSX.Element => (
  <IconGenerator icon={faMinus} {...props} className="text-gray-500 text-sm" />
);

export const RocketIcon = (props: Props): JSX.Element => <IconGenerator icon={faRocket} {...props} />;
