import React from 'react';
import ReactIcon from './../ReactIcon';
import './styles.css';


export default function ReactDownload({ link, title, icon }) {
  const iconSection = (
    <span className="ReactDownload-icon">
      <ReactIcon type="ReactDownload" size="small" />
    </span>
  );

  return (
    <a href={link} className="ReactDownload" target="_blank">
      {icon ? iconSection : null}
      <span>{title}</span>
    </a>
  );
}
