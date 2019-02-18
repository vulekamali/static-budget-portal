import React from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

const calcProgress = (name) => {
  const increment = 100 / 9;

  switch (name) {
    case 'Site identification': return increment * 1;
    case 'Pre-feasibility': return increment * 2;
    case 'Feasibility': return increment * 3;
    case 'Design': return increment * 4;
    case 'Tender': return increment * 5;
    case 'Construction': return increment * 6;
    case 'Hand over': return increment * 7;
    case 'Handed over': return increment * 8;
    case 'Complete': return increment * 9;
    default: return null;
  }
}

const StyledLinearProgress = styled(LinearProgress)`
  && {
    height: 16px;
    border-radius: 200px;
    background: #DCDCDC;

    & .barColorPrimary {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, #ECA03E 83.33%), #ECA03E;
      border-right: 2px solid;
    }
  }
`;

const Progressbar = ({ stage }) => {
  return (
    <React.Fragment>
      {calcProgress(stage) && <StyledLinearProgress classes={{barColorPrimary: 'barColorPrimary', root: 'root'}} variant="determinate" value={calcProgress(stage)} />}
    </React.Fragment>
  );
};

export default Progressbar;
