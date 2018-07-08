import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

import Close from './partials/Close.jsx';
import Download from './partials/Download.jsx';
import Facebook from './partials/Facebook.jsx';
import Search from './partials/Search.jsx';
import Twitter from './partials/Twitter.jsx';
import Home from './partials/Home.jsx';
import Play from './partials/Play.jsx';
import Hamburger from './partials/Hamburger.jsx';
import Pin from './partials/Pin.jsx';
import Calendar from './partials/Calendar.jsx';

export default function ReactIcon({ size, type }) {
  switch (type) {
    case 'close': return <Close {...{ size }} />;
    case 'download': return <Download {...{ size }} />;
    case 'facebook': return <Facebook {...{ size }} />;
    case 'search': return <Search {...{ size }} />;
    case 'twitter': return <Twitter {...{ size }} />;
    case 'play': return <Play {...{ size }} />;
    case 'home': return <Home {...{ size }} />;
    case 'hamburger': return <Hamburger {...{ size }} />;
    case 'pin': return <Pin {...{ size }} />;
    case 'calendar': return <Calendar {...{ size }} />;
    default: return null;
  }
}


ReactIcon.propTypes = {
  type: PropTypes.oneOf(['close', 'ReactDownload', 'facebook', 'search', 'twitter', 'play', 'home', 'hamburger', 'pin', 'calendar', 'download']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

ReactIcon.defaultProps = {
  size: 'medium',
}