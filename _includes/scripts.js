import 'classlist-polyfill';
import 'whatwg-fetch';
import 'preact/devtools';

import './styles.scss';

import './utilities/js/modules/createComponentInterfaces.js';
import './utilities/js/modules/loadStringQueries.js';
import './utilities/js/modules/loadGoogleAnalytics.js';
import './utilities/js/modules/polyfillOldFeatures.js';

import './components/universal/Tooltip/scripts.js';
import './components/universal/BarChart/scripts.jsx';
import './components/universal/ColumnChart/scripts.jsx';
import './components/universal/ResponsiveChart/scripts.jsx';
import './components/universal/Share/index.jsx';
import './components/universal/ValueBlocks/scripts.jsx';

import './components/header-and-footer/NavBar/scripts.js';
import './components/header-and-footer/SubLinks/scripts.js';
import './components/header-and-footer/YearSelect/index.jsx';
import './components/header-and-footer/Search/index.jsx';

import './components/department-page/ProgrammesChart/scripts.jsx';
import './components/department-page/ExpenditureChart/scripts.jsx';

import './components/other-pages/DeptSearch/index.jsx';
import './components/other-pages/SearchResult/index.jsx';

import './components/about-and-learning-centre/Glossary/index.jsx';
import './components/about-and-learning-centre/Videos/index.jsx';
import './components/about-and-learning-centre/Video/index.jsx';

import './components/homepage/Revenue/index.jsx';
import './components/homepage/HomeChart/scripts.jsx';
// import './components/homepage/Expenditure/index.jsx';
