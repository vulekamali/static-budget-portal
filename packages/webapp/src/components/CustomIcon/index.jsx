import { SvgIcon } from '@material-ui/core';
import React from 'react';

import Test from './Test';
import SocialDevelopment from './SocialDevelopment';
import EconomicAffairsAndAgriculture from './EconomicAffairsAndAgriculture';
import Defence from './Defence';
import DebtServiceCosts from './DebtServiceCosts';
import ContingencyReserve from './ContingencyReserve';
import GeneralAdmin from './GeneralAdmin';
import EconomicDevelopment from './EconomicDevelopment';
import Health from './Health';
import LearningAndCulture from './LearningAndCulture';
import LocalDevelopmentAndInfrastructure from './LocalDevelopmentAndInfrastructure';
import CommunityDevelopment from './CommunityDevelopment';
import PeaceAndSecurity from './PeaceAndSecurity';
import GeneralPublicServices from './GeneralPublicServices';
import PostSchoolTraining from './PostSchoolTraining';

const returnContent = (type) => {
  switch (type) {
    case 'Test': return <Test />;
    case 'social-development': return <SocialDevelopment />;
    case 'economic-affairs-and-agriculture': return <EconomicAffairsAndAgriculture />;
    case 'defence': return <Defence />;
    case 'debt-service-costs': return <DebtServiceCosts />;
    case 'contingency-reserve': return <ContingencyReserve />;
    case 'general-admin': return <GeneralAdmin />;
    case 'economic-development': return <EconomicDevelopment />;
    case 'health': return <Health />;
    case 'learning-and-culture': return <LearningAndCulture />;
    case 'local-development-and-infrastructure': return <LocalDevelopmentAndInfrastructure />;

    case 'community-development': return <CommunityDevelopment />;
    case 'peace-and-security': return <PeaceAndSecurity />;
    case 'general-public-services': return <GeneralPublicServices />;
    case 'post-school-training': return <PostSchoolTraining />;
    default: return null;
  }
};

const CustomIcon = ({ type, ...props }) => (
  <SvgIcon {...props}>
    {returnContent(type)}
  </SvgIcon>
);

export default CustomIcon;
