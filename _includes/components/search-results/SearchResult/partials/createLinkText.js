export default function (innerTabKey) {
  switch (innerTabKey) {
    case 'national': return 'Estimates of National Expenditure (ENE)';
    case 'provincial': return 'Estimates of Provincial Revenue and Expenditure (EPRE)';
    default: return null;
  }
}