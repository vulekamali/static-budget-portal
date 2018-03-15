import jan from './jan.html';
import feb from './feb.html';
import mar from './mar.html';
import apr from './apr.html';
import may from './may.html';
import jun from './jun.html';
import jul from './jul.html';
import aug from './aug.html';
import sep from './sep.html';
import oct from './oct.html';
import nov from './nov.html';
import dec from './dec.html';


export default function returnHtml(key) {
  switch (key) {
    case 'Jan': return jan;
    case 'Feb': return feb;
    case 'Mar': return mar;
    case 'Apr': return apr;
    case 'May': return may;
    case 'Jun': return jun;
    case 'Jul': return jul;
    case 'Aug': return aug;
    case 'Sep': return sep;
    case 'Oct': return oct;
    case 'Nov': return nov;
    case 'Dec': return dec;
    default: return '';
  }
}
