/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { CssBaseline } from '@material-ui/core';

import { randomLengthBlankArray, randomNumber, randomBool } from '../../helpers/randomizer';
import Treemap from './index';

const nestedItems = [{"name":"Eastern Cape","amount":78433947071.99603,"percentage":13.257633039392502,"children":[{"amount":34772125813.66324,"name":"Education","province":"Eastern Cape","id":"education","percentage":0},{"amount":23699560300.5,"name":"Health","province":"Eastern Cape","id":"health","percentage":0},{"amount":4811584101.5,"name":"Transport","province":"Eastern Cape","id":"transport","percentage":0},{"amount":2836581000,"name":"Social Development","province":"Eastern Cape","id":"social-development","percentage":0},{"amount":2376749000,"name":"Human Settlements","province":"Eastern Cape","id":"human-settlements","percentage":0},{"amount":2344172000,"name":"Roads And Public Works","province":"Eastern Cape","id":"roads-and-public-works","percentage":0},{"amount":2328236322.4110003,"name":"Rural Development And Agrarian Reform","province":"Eastern Cape","id":"rural-development-and-agrarian-reform","percentage":0},{"amount":1146006188,"name":"Economic Development, Environmental Affairs And Tourism","province":"Eastern Cape","id":"economic-development-environmental-affairs-and-tourism","percentage":0},{"amount":983800097.958883,"name":"Cooperative Governance And Traditional Affairs","province":"Eastern Cape","id":"cooperative-governance-and-traditional-affairs","percentage":0},{"amount":973396122,"name":"Office Of The Premier","province":"Eastern Cape","id":"office-of-the-premier","percentage":0},{"amount":942759682.6,"name":"Sport, Recreation, Arts And Culture","province":"Eastern Cape","id":"sport-recreation-arts-and-culture","percentage":0},{"amount":591487000,"name":"Provincial Treasury","province":"Eastern Cape","id":"provincial-treasury","percentage":0},{"amount":525999443.3629,"name":"Provincial Legislature","province":"Eastern Cape","id":"provincial-legislature","percentage":0},{"amount":101490000,"name":"Safety And Liaison","province":"Eastern Cape","id":"safety-and-liaison","percentage":0}]},{"name":"Free State","amount":34877227030,"percentage":5.89527232348622,"children":[{"amount":13579224000,"name":"Education","province":"Free State","id":"education","percentage":0},{"amount":10403313000,"name":"Health","province":"Free State","id":"health","percentage":0},{"amount":2776609000,"name":"Police, Roads And Transport","province":"Free State","id":"police-roads-and-transport","percentage":0},{"amount":1635268000,"name":"Public Works And Infrastructure","province":"Free State","id":"public-works-and-infrastructure","percentage":0},{"amount":1391778000,"name":"Human Settlements","province":"Free State","id":"human-settlements","percentage":0},{"amount":1266057000,"name":"Social Development","province":"Free State","id":"social-development","percentage":0},{"amount":810479000,"name":"Agriculture And Rural Development","province":"Free State","id":"agriculture-and-rural-development","percentage":0},{"amount":727010030,"name":"Sport, Arts, Culture And Recreation","province":"Free State","id":"sport-arts-culture-and-recreation","percentage":0},{"amount":631931000,"name":"Economic And Small Business Development, Tourism And Environmental Affairs","province":"Free State","id":"economic-and-small-business-development-tourism-and-environmental-affairs","percentage":0},{"amount":611279000,"name":"Premier","province":"Free State","id":"premier","percentage":0},{"amount":443329000,"name":"Cooperative Governance And Traditional Affairs","province":"Free State","id":"cooperative-governance-and-traditional-affairs","percentage":0},{"amount":347832000,"name":"Provincial Treasury","province":"Free State","id":"provincial-treasury","percentage":0},{"amount":253118000,"name":"Free State Legislature","province":"Free State","id":"free-state-legislature","percentage":0}]},{"name":"Gauteng","amount":121359156251.8454,"percentage":20.513249933480846,"children":[{"amount":46429326000,"name":"Health","province":"Gauteng","id":"health","percentage":0},{"amount":45220540006,"name":"Education","province":"Gauteng","id":"education","percentage":0},{"amount":7713818000,"name":"Roads And Transport","province":"Gauteng","id":"roads-and-transport","percentage":0},{"amount":5888425147.3354,"name":"Human Settlements","province":"Gauteng","id":"human-settlements","percentage":0},{"amount":4983495000,"name":"Social Development","province":"Gauteng","id":"social-development","percentage":0},{"amount":3036963930.11,"name":"Infrastructure Development","province":"Gauteng","id":"infrastructure-development","percentage":0},{"amount":1510450000,"name":"Economic Development","province":"Gauteng","id":"economic-development","percentage":0},{"amount":1273825944,"name":"E-Government","province":"Gauteng","id":"e-government","percentage":0},{"amount":957000000,"name":"Agriculture And Rural Development","province":"Gauteng","id":"agriculture-and-rural-development","percentage":0},{"amount":942651500,"name":"Sport, Arts, Culture And Recreation","province":"Gauteng","id":"sport-arts-culture-and-recreation","percentage":0},{"amount":796413000,"name":"Gauteng Provincial Treasury","province":"Gauteng","id":"gauteng-provincial-treasury","percentage":0},{"amount":719495000,"name":"Community Safety","province":"Gauteng","id":"community-safety","percentage":0},{"amount":715823724.4,"name":"Gauteng Provincial Legislature","province":"Gauteng","id":"gauteng-provincial-legislature","percentage":0},{"amount":702694000,"name":"Office Of The Premier","province":"Gauteng","id":"office-of-the-premier","percentage":0},{"amount":468235000,"name":"Cooperative Governance And Traditional Affairs","province":"Gauteng","id":"cooperative-governance-and-traditional-affairs","percentage":0}]},{"name":"Limpopo","amount":65373493770.98109,"percentage":11.050034114987485,"children":[{"amount":30607771897.6,"name":"Education","province":"Limpopo","id":"education","percentage":0},{"amount":19511420000,"name":"Health","province":"Limpopo","id":"health","percentage":0},{"amount":3118175538.277785,"name":"Public Works, Roads And Infrastructure","province":"Limpopo","id":"public-works-roads-and-infrastructure","percentage":0},{"amount":2624005580.0433,"name":"Co-Operative Governance, Human Settlements And Traditional Affairs","province":"Limpopo","id":"co-operative-governance-human-settlements-and-traditional-affairs","percentage":0},{"amount":2106228296.16,"name":"Transport","province":"Limpopo","id":"transport","percentage":0},{"amount":1986729061.1,"name":"Social Development","province":"Limpopo","id":"social-development","percentage":0},{"amount":1917354000,"name":"Agriculture","province":"Limpopo","id":"agriculture","percentage":0},{"amount":1665373538,"name":"Economic Development, Environment And Tourism","province":"Limpopo","id":"economic-development-environment-and-tourism","percentage":0},{"amount":472850360,"name":"Provincial Treasury","province":"Limpopo","id":"provincial-treasury","percentage":0},{"amount":472264428.4,"name":"Sport, Arts And Culture","province":"Limpopo","id":"sport-arts-and-culture","percentage":0},{"amount":420680000,"name":"Office Of The Premier","province":"Limpopo","id":"office-of-the-premier","percentage":0},{"amount":360927071.4,"name":"Provincial Legislature","province":"Limpopo","id":"provincial-legislature","percentage":0},{"amount":109714000,"name":"Community Safety","province":"Limpopo","id":"community-safety","percentage":0}]},{"name":"Mpumalanga","amount":48107442000,"percentage":8.131565939355546,"children":[{"amount":20973433000,"name":"Education","province":"Mpumalanga","id":"education","percentage":0},{"amount":13278174000,"name":"Health","province":"Mpumalanga","id":"health","percentage":0},{"amount":4987002000,"name":"Public Works, Roads And Transport","province":"Mpumalanga","id":"public-works-roads-and-transport","percentage":0},{"amount":1774080000,"name":"Human Settlements","province":"Mpumalanga","id":"human-settlements","percentage":0},{"amount":1551584000,"name":"Social Development","province":"Mpumalanga","id":"social-development","percentage":0},{"amount":1222822000,"name":"Community Safety, Security And Liaison","province":"Mpumalanga","id":"community-safety-security-and-liaison","percentage":0},{"amount":1198058000,"name":"Economic Development And Tourism","province":"Mpumalanga","id":"economic-development-and-tourism","percentage":0},{"amount":1180437000,"name":"Agriculture, Rural Development, Land And Environmental Affairs","province":"Mpumalanga","id":"agriculture-rural-development-land-and-environmental-affairs","percentage":0},{"amount":522260000,"name":"Co-Operative Governance And Traditional Affairs","province":"Mpumalanga","id":"co-operative-governance-and-traditional-affairs","percentage":0},{"amount":468461000,"name":"Culture, Sport And Recreation","province":"Mpumalanga","id":"culture-sport-and-recreation","percentage":0},{"amount":346647000,"name":"Provincial Legislature","province":"Mpumalanga","id":"provincial-legislature","percentage":0},{"amount":322706000,"name":"Finance","province":"Mpumalanga","id":"finance","percentage":0},{"amount":281778000,"name":"Office Of The Premier","province":"Mpumalanga","id":"office-of-the-premier","percentage":0}]},{"name":"Northern Cape","amount":17150266613.720499,"percentage":2.89889709469475,"children":[{"amount":6417223000,"name":"Education","province":"Northern Cape","id":"education","percentage":0},{"amount":4735195000,"name":"Health","province":"Northern Cape","id":"health","percentage":0},{"amount":1747944000,"name":"Roads And Public Works","province":"Northern Cape","id":"roads-and-public-works","percentage":0},{"amount":870916000,"name":"Social Development","province":"Northern Cape","id":"social-development","percentage":0},{"amount":831899000,"name":"Cooperative Governance, Human Settlements And Traditional Affairs","province":"Northern Cape","id":"cooperative-governance-human-settlements-and-traditional-affairs","percentage":0},{"amount":648908233.2,"name":"Agriculture, Land Reform And Rural Development","province":"Northern Cape","id":"agriculture-land-reform-and-rural-development","percentage":0},{"amount":382820568,"name":"Sport, Arts And Culture","province":"Northern Cape","id":"sport-arts-and-culture","percentage":0},{"amount":314834000,"name":"Economic Development And Tourism","province":"Northern Cape","id":"economic-development-and-tourism","percentage":0},{"amount":302231664.5,"name":"Provincial Treasury","province":"Northern Cape","id":"provincial-treasury","percentage":0},{"amount":291696009.59999996,"name":"Transport, Safety And Liaison","province":"Northern Cape","id":"transport-safety-and-liaison","percentage":0},{"amount":248331000,"name":"Provincial Legislature","province":"Northern Cape","id":"provincial-legislature","percentage":0},{"amount":200280000,"name":"Office Of The Premier","province":"Northern Cape","id":"office-of-the-premier","percentage":0},{"amount":157988138.4205,"name":"Environment And Nature Conservation","province":"Northern Cape","id":"environment-and-nature-conservation","percentage":0}]},{"name":"Western Cape","amount":62748199000,"percentage":10.606282448863187,"children":[{"amount":23063703000,"name":"Health","province":"Western Cape","id":"health","percentage":0},{"amount":22193312000,"name":"Education","province":"Western Cape","id":"education","percentage":0},{"amount":7729440000,"name":"Transport And Public Works","province":"Western Cape","id":"transport-and-public-works","percentage":0},{"amount":2318554000,"name":"Human Settlements","province":"Western Cape","id":"human-settlements","percentage":0},{"amount":2241664000,"name":"Social Development","province":"Western Cape","id":"social-development","percentage":0},{"amount":1486193000,"name":"Premier","province":"Western Cape","id":"premier","percentage":0},{"amount":834342000,"name":"Agriculture","province":"Western Cape","id":"agriculture","percentage":0},{"amount":760734000,"name":"Cultural Affairs And Sport","province":"Western Cape","id":"cultural-affairs-and-sport","percentage":0},{"amount":604621000,"name":"Environmental Affairs And Development Planning","province":"Western Cape","id":"environmental-affairs-and-development-planning","percentage":0},{"amount":433462000,"name":"Economic Development And Tourism","province":"Western Cape","id":"economic-development-and-tourism","percentage":0},{"amount":325390000,"name":"Provincial Treasury","province":"Western Cape","id":"provincial-treasury","percentage":0},{"amount":316617000,"name":"Community Safety","province":"Western Cape","id":"community-safety","percentage":0},{"amount":252796000,"name":"Local Government","province":"Western Cape","id":"local-government","percentage":0},{"amount":187371000,"name":"Provincial Parliament","province":"Western Cape","id":"provincial-parliament","percentage":0}]},{"name":"North West","amount":41072116000,"percentage":6.942389901397375,"children":[{"amount":16183868000,"name":"Education And Sports Development","province":"North West","id":"education-and-sports-development","percentage":0},{"amount":11153568000,"name":"Health","province":"North West","id":"health","percentage":0},{"amount":3020961000,"name":"Public Works And Roads","province":"North West","id":"public-works-and-roads","percentage":0},{"amount":2476863000,"name":"Local Government And Human Settlements","province":"North West","id":"local-government-and-human-settlements","percentage":0},{"amount":2163473400,"name":"Community Safety And Transport Management","province":"North West","id":"community-safety-and-transport-management","percentage":0},{"amount":1608750000,"name":"Social Development","province":"North West","id":"social-development","percentage":0},{"amount":1440478000,"name":"Rural, Environment And Agricultural Development","province":"North West","id":"rural-environment-and-agricultural-development","percentage":0},{"amount":775381400,"name":"Office Of The Premier","province":"North West","id":"office-of-the-premier","percentage":0},{"amount":732049400,"name":"Culture, Arts And Traditional Affairs","province":"North West","id":"culture-arts-and-traditional-affairs","percentage":0},{"amount":484084400,"name":"Finance","province":"North West","id":"finance","percentage":0},{"amount":473898000,"name":"Provincial Legislature","province":"North West","id":"provincial-legislature","percentage":0},{"amount":297190400,"name":"Economy And Enterprise Development","province":"North West","id":"economy-and-enterprise-development","percentage":0},{"amount":261551000,"name":"Tourism","province":"North West","id":"tourism","percentage":0}]}];

const smallItems = randomLengthBlankArray(5, 9).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const basicItems = randomLengthBlankArray(20, 30).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const largeItem = randomLengthBlankArray(35, 45).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const SmallWithKnobs = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={basicItems} onSelectedChange={console.log} />
    </Fragment>
  );
};

const MediumWithKnobs = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={smallItems} onSelectedChange={console.log} />
    </Fragment>
  );
};

const LargeWithKnobs = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={largeItem} onSelectedChange={console.log} />
    </Fragment>
  );
};

const NestedWithKnobs = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={nestedItems} onSelectedChange={console.log} />
    </Fragment>
  );
};



const basic = () => <SmallWithKnobs />;
const small = () => <MediumWithKnobs />;
const large = () => <LargeWithKnobs />;
const nested = () => <NestedWithKnobs />;

storiesOf('component.Treemap', module)
  .add('Basic', basic)
  .add('Small Treemap', small)
  .add('Large Treemap', large)
  .add('Nested Items', nested);
