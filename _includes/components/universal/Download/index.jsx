import { h } from 'preact';
import Icon from './../Icon/index.jsx';


export default function Download({ link, title, icon }) {
  const iconSection = (
    <span className="Download-icon">
      <Icon type="download" size="small" />
    </span>
  );

  return (
    <a href={link} className="Download">
      {icon ? iconSection : null}
      <span>{title}</span>
    </a>
  );
}
