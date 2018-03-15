export default function fullMonthName(shortname) {
  switch (shortname) {
    case 'Jan': return 'January';
    case 'Feb': return 'February';
    case 'Mar': return 'March';
    case 'Apr': return 'April';
    case 'May': return 'May';
    case 'Jun': return 'June';
    case 'Jul': return 'July';
    case 'Aug': return 'August';
    case 'Sept': return 'September';
    case 'Oct': return 'October';
    case 'Nov': return 'November';
    case 'Dec': return 'December';
    default: return 'this month';
  }
}