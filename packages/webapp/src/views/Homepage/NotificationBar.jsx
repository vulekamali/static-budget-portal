import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import t from 'prop-types';

const NoticeWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 300px;
  padding: 10px 20px;
  font-family: Lato;
  font-size: 14px;
  line-height: 1.5;

  top: ${({ hasCallToAction }) => (hasCallToAction ? 'calc(100% - 40px)' : 'auto')};
  bottom: ${({ hasCallToAction }) => (hasCallToAction ? 'auto' : 'calc(100% - 40px)')};
  @media (min-width: 450px) {
    max-width: 350px;
  }

  @media (min-width: 650px) {
    max-width: 450px;
  }
`;

const CallToActionPositionWrapper = styled.div`
  bottom: calc(100% - 70px);
  width: 100%;
  max-width: 650px;
  padding: 10px 20px;
  position: absolute;
`;

const CallToActionPosition = styled.div`
  position: relative;
  width: 100%;
`;


const CallToAction = styled(Card)`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Wrapper = styled.div`
  display: flex;
  background: #79B443;
  min-height: ${({ hasCallToAction }) => (hasCallToAction ? '100px' : '50px')};
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Text = styled(CardContent)`
  text-align: center;
`;

const buildNotice = (noticeText, hasCallToAction) => (
  <NoticeWrapper {...{ hasCallToAction }}>
    <Card>
      <Text>
        {noticeText}
      </Text>
    </Card>
  </NoticeWrapper>
);


const buildCallToAction = callToActionData => (
  <CallToActionPositionWrapper>
    <CallToActionPosition>
      <CallToAction>
        <CardContent>
          <div>
            {callToActionData.subheading}
            {callToActionData.heading}
          </div>
          <div>
            {/* {callToActionData.heading} */}
          </div>
        </CardContent>
      </CallToAction>
    </CallToActionPosition>
  </CallToActionPositionWrapper>
);


const NotificationBar = ({ notice: noticeText, callToAction: callToActionData }) => {
  return (
    <Wrapper hasCallToAction={!!callToActionData}>
      {noticeText && buildNotice(noticeText, !!callToActionData)}
      {callToActionData && buildCallToAction(callToActionData)}
    </Wrapper>
  );
};

NotificationBar.propTypes = {
  notice: t.string,
  callToAction: t.shape({
    subheading: t.string,
    heading: t.string,
    link: t.shape({
      text: t.string,
      link: t.string,
    }),
  }),
};

NotificationBar.defaultProps = {
  notice: null,
  callToAction: null,
};

export default NotificationBar;
