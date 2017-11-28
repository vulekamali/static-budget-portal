import { h } from 'preact';
import Icon from './Icon.jsx';


export default function Button({ selected }) {
  const url = window.location.href;

  const copyText = () => {
    window.prompt('Press Ctrl+C to copy this link to your clipboard', url);
  };
  const fbDirect = () => {
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    win.focus();
  };
  const twDirect = () => {
    const win = window.open(`https://twitter.com/home?status=${url}`, '_blank');
    win.focus();
  };

  const share = () => {
    if (selected === 'copy') {
      return copyText();
    } else if (selected === 'facebook') {
      return fbDirect();
    } else if (selected === 'twitter') {
      return twDirect();
    }

    return null;
  };

  return (
    <div className="Share-button" onClick={share}>
      <Icon />
    </div>
  );
}
