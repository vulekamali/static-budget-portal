
const calcShorthand = (name) => {
  switch (name) {
    case 'Eastern Cape': return 'EC';
    case 'Freestate': return 'FS';
    case 'Gauteng': return 'GP';
    case 'Kwazulu Natal': return 'KZN';
    case 'Limpopo': return 'LIM';
    case 'Mpumalanga': return 'MP';
    case 'Northern Cape': return 'NC';
    case 'North West Province': return 'NW';
    case 'Western Cape': return 'WC';
    default: return null;
  }
}


const trimValues = (rawValue, abbreviated) => {
  const value = parseInt(rawValue, 10);
  const million = abbreviated ? 'm' : 'million';
  const billion = abbreviated ? 'bn' : 'billion';

  if (value < 1000000 && value > -1000000) {
    return value.toFixed(1).replace(/\.0$/, '');
  }

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')} ${billion}`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')} ${million}`;
  }

  if (value <= -1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')} ${billion}`;
  }

  if (value <= -1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')} ${million}`;
  }


  return null;
}


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


export {
  calcShorthand,
  trimValues,
  calcProgress,
}

export default {
  calcShorthand,
  trimValues,
  calcProgress,
}