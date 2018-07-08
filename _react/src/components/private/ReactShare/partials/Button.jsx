import React from 'react';
import ReactIcon from './../../../private/ReactIcon';


export default function ReactButton({ selected, anchor, showLink }) {
  const url = encodeURIComponent(window.location.href);
  const message = encodeURIComponent('SA Budget Data from vulekamali');
  const anchorText = anchor ? `#${anchor}` : '';
  const anchorUri = anchor ? encodeURIComponent(anchorText) : '';

  const copyText = () => {
    const markup = (
      <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href + anchorText}>
        {window.location.href + anchorText}
      </a>
    );

    showLink(markup);
  };

  const fbDirect = () => {
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}${anchorUri}`, '_blank');
    win.focus();
  };

  const twDirect = () => {
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

  return (
    <button className="ReactButton is-circle" onClick={share}>
      <div className="u-transformRotate270">
        <ReactIcon type="download" size="small" />
      </div>
    </button>
  );
}