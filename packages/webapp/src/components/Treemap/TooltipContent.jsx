import React from 'react';

import trimValues from '../../helpers/trimValues';
import { Text, StyledTooltip } from './styled';

const TooltipContent = ({ name, amount }) => {
  return (
    <StyledTooltip>
      <Text bold>{name}</Text>
      <Text>R{trimValues(amount, true)}</Text>
    </StyledTooltip>
  );
};

export default TooltipContent;
