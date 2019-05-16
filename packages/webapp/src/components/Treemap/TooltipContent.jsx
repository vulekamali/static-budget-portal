import React from 'react';

import trimValues from '../../helpers/trimValues';
import { Text, StyledTooltip } from './styled';

const TooltipContent = ({ payload }) => {
  if (payload.length <= 0) {
    return null;
  }

  const { name, amount } = payload[0].payload;

  return (
    <StyledTooltip>
      <Text bold>{name}</Text>
      <Text>R{trimValues(amount, true)}</Text>
    </StyledTooltip>
  );
};

export default TooltipContent;
