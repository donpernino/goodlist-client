import styled from 'styled-components';
import remCalc from '../../utils/remCalc';
import { breakpoint } from '../../constants';

const _Spacer = styled.div`
  width: ${props => remCalc(props.width)};
  flex: 0 0 ${props => remCalc(props.width)};
  height: ${props => remCalc(props.height)};

  ${breakpoint.large} {
    width: ${props => remCalc(props.xwidth)};
    flex: 0 0 ${props => remCalc(props.xwidth)};
    height: ${props => remCalc(props.xheight)};
  }
`;

export default _Spacer;
