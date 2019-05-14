import { titleCase } from 'change-case';

const calcPrettyName = government => {
  if (government === 'south-africa') {
    return 'National Budget';
  }
  if (!government) {
    return 'Focus Areas';
  }
  return titleCase(government);
};

export default calcPrettyName;
