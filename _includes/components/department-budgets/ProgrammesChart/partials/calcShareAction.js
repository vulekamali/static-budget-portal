import analyticsEvents from './../../../../utilities/js/helpers/analyticsEvent.js';


export default function calcShareAction(selected, anchorString, updateModal) {
  console.log(window.location.href, anchor, anchor ? true : false);
  const url = encodeURIComponent(window.location.href);
  const anchor = anchorString ? `#${anchorString}` : '';
  const message = encodeURIComponent('SA Budget Data from vulekamali');

  const copyText = () => {
    analyticsEvents('send', 'social', 'email', 'share', url);
    updateModal();
  };

  const fbDirect = () => {
    analyticsEvents('send', 'social', 'facebook', 'share', url);
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}${anchor}`, '_blank');
    win.focus();
  };

  const twDirect = () => {
    analyticsEvents('send', 'social', 'twitter', 'share', url);
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
