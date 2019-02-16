import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';


const Position = styled.div`
  position: absolute;
  left: ${({ x }) => x}px;
  bottom: ${({ y }) => y}px;
`;


const Card = styled(Paper)`
  padding: 6px 10px;
  font-family: Lato;
  font-size: 13px;
  font-weight: bold;
  box-shadow:
    0 2px 2px rgba(0, 0, 0, 0.05),
    0 4px 4px rgba(0, 0, 0, 0.25);
`

const Tooltip = ({ x, y, text }) => {
  return (
    <Position {...{ x, y }}>
      <Card>
        {text}
      </Card>
    </Position>
  )
}


export default Tooltip;