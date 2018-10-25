import { ga } from 'react-ga';
import { h } from 'preact';
import Icon from './../../../universal/Icon/index.jsx';
import { createModal } from './../../../header-and-footer/Modals/redux.js';


export default function Button({ selected, anchor, purple }) {
  const url = encodeURIComponent(window.location.href);
  const message = encodeURIComponent('SA Budget Data from vulekamali');
  const anchorText = anchor ? `#${anchor}` : '';
  const anchorUri = anchor ? encodeURIComponent(anchorText) : '';

  const copyText = () => {
    ga('send', 'social', 'email', 'share', url);
    createModal(
      'Share this link',
      (
        <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href + anchorText}>
          {window.location.href + anchorText}
        </a>
      ),
    );
  };

  const fbDirect = () => {
    ga('send', 'social', 'facebook', 'share', url);
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}${anchorUri}`, '_blank');
    win.focus();
  };

  const twDirect = () => {
    ga('send', 'social', 'twitter', 'share', url);
    const win = window.open(`https://twitter.com/home?status=${message}%20${url}${anchorUri}`, '_blank');
    win.focus();
  };

  const share = () => {
    if (selected === 'link') {
      return copyText();
    } else if (selected === 'facebook') {
      return fbDirect();
    } else if (selected === 'twitter') {
      return twDirect();
    }

    return null;
  };

  const rootClasses = [
    'Button',
    'is-circle',
    purple && 'is-purple',
  ].join(' ');


  return (
    <button className={rootClasses} onClick={share}>
      <div className="u-transformRotate270">
        <Icon type="download" size="small" />
      </div>
    </button>
  );
}