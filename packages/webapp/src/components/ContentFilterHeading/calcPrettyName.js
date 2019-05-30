import { titleCase } from 'change-case';

const calcPrettyName = title => {
  if (title === 'south-africa') {
    return 'National Budget';
  }
  return titleCase(title);
};

export default calcPrettyName;
