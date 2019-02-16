import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import posed, { PoseGroup } from 'react-pose';


const CardAnimation = posed.div({
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    y: 3,
    opacity: 0,
  }
})


const Position = styled(CardAnimation)`
  position: absolute;
  left: ${({ x }) => x + 20}px;
  top: ${({ y }) => y - 15}px;
`;

const Card = styled(Paper)`
  padding: 6px 10px 8px 10px;
  font-family: Lato;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow:
    0 2px 2px rgba(0, 0, 0, 0.05),
    0 4px 4px rgba(0, 0, 0, 0.25);
`

const buildTooltip = (x, y, title) => (
  <Position {...{ x, y }} key={`${x}-${y}`}>
    <CardAnimation>
      <Card>
        {title}
      </Card>
    </CardAnimation>
  </Position>
)


const Tooltip = ({ items }) => (
  <PoseGroup>
    {items.map(({ x, y, title }) => !!x && !!y && !!title && buildTooltip(x, y, title))}
  </PoseGroup>
);


export default Tooltip;