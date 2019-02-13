import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const NoticeWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 640px;
  padding: 10px 20px;
  top: ${({ hasCallToAction }) => (hasCallToAction ? 'calc(100% - 40px)' : 'auto')};
  bottom: ${({ hasCallToAction }) => (hasCallToAction ? 'auto' : 'calc(100% - 40px)')};
  @media (min-width: 378px) {
    margin: 0 auto;
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
  background: green;
  min-height: ${({ hasCallToAction }) => (hasCallToAction ? '100px' : '50px')};
  position: relative;
  justify-content: center;
  align-items: center;
`;


const buildNotice = (noticeText, hasCallToAction) => (
  <NoticeWrapper {...{ hasCallToAction }}>
    <Card>
      <CardContent>
        {noticeText}
      </CardContent>
    </Card>
  </NoticeWrapper>
);


const buildCallToAction = callToActionData => (
  <CallToActionPositionWrapper>
    <CallToActionPosition>
      <CallToAction>
        <CardContent>
          <div>
            {callToActionData.heading}
          </div>
          <div>
            {callToActionData.subheading}
          </div>
          <div>
            {callToActionData.heading}
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


export default NotificationBar;
