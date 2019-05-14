import { createElement } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataLoader from './DataLoader';

const passRouteValues = ({ match }) => createElement(DataLoader, match.params);

const routeConfig = {
  path: '/:year/focus/:department',
  component: passRouteValues,
};

const resolveRoute = createElement(Route, routeConfig);

const Routing = () => {
  return createElement(Router, {}, resolveRoute);
};

export default Routing;
