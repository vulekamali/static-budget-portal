const calcFineprint = year => {
  const yearAsNumber = parseInt(year.substr(0, 4), 10);
  return `Budget data from 1 April ${yearAsNumber} - 31 March ${yearAsNumber + 1}`;
};

export default calcFineprint;
