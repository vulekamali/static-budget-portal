import { titleCase } from 'change-case';

const calcPrettyName = government => {
  if (government === 'south-africa') {
    return 'National Budget';
  }
  return titleCase(government);
};

export default calcPrettyName;
