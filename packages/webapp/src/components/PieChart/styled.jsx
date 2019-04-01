import styled from 'styled-components';

const StyledCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: #000000;
`;

const StyledSvg = styled.svg`
  border: 0.5px solid #000000;
  border-radius: 50%;
  margin-right: 4px;
`;

export {
  StyledCircle,
  StyledSvg,
}
