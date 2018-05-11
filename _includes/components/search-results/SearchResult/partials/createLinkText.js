export default function (sphere, string) {
  switch (sphere) {
    case 'national': return 'Estimates of National Expenditure (ENE)';
    case 'provincial': return 'Estimates of Provincial Revenue and Expenditure (EPRE)';
    case 'cso': return string;
    default: return null;
  }
}
