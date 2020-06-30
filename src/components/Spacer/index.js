// @flow
import React from 'react';
import _Spacer from './styles';

type Props = {
  width: number | string,
  xwidth?: number | string | null,
  height: number | string,
  xheight?: number | string | null,
  customStyle?: Object
};

const Spacer = (props: Props) => (
  <_Spacer
    {...props}
    style={props.customStyle} />
);

Spacer.defaultProps = {
  width: 'auto',
  height: 'auto'
};

export default Spacer;
