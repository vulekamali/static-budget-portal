import { h } from 'preact';
import Icon from './Icon.jsx';
import analyticsEvents from './../../../../utilities/js/helpers/analyticsEvent.js';


export default function Button({ selected, updateModal }) {
  const url = encodeURIComponent(window.location.href);
  const message = encodeURIComponent("SA Budget Data from vulekamali");

  const copyText = () => {
    analyticsEvents('send', 'social', 'email', 'share', url);
    updateModal(true);
  };
  const fbDirect = () => {
    analyticsEvents('send', 'social', 'facebook', 'share', url);
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    win.focus();
  };
  const twDirect = () => {
    analyticsEvents('send', 'social', 'twitter', 'share', url);
    const win = window.open(`https://twitter.com/home?status=${message}%20${url}`, '_blank');
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
    <div className="Button is-circle" onClick={share}>
      <Icon />
    </div>
  );
}
