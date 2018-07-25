import { ga } from 'react-ga';


export default function calcShareAction(selected, anchorString, updateModal) {
  const url = encodeURIComponent(window.location.href);
  const anchor = anchorString ? `#${anchorString}` : '';
  const message = encodeURIComponent('SA Budget Data from vulekamali');

  const copyText = () => {
    ga('send', 'social', 'email', 'share', url);
    updateModal();
  };

  const fbDirect = () => {
    ga('send', 'social', 'facebook', 'share', url);
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}${anchor}`, '_blank');
    win.focus();
  };

  const twDirect = () => {
    ga('send', 'social', 'twitter', 'share', url);
    const win = window.open(`https://twitter.com/home?status=${message}%20${url}${anchor}`, '_blank');
    win.focus();
  };

  if (selected === 'link') {
    return copyText();
  } else if (selected === 'facebook') {
    return fbDirect();
  } else if (selected === 'twitter') {
    return twDirect();
  }

  return null;
}
