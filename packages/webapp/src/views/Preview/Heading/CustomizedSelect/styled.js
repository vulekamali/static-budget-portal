import styled from 'styled-components';

import { Select } from '@material-ui/core';

const CustomizedForm = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;

  @media screen and (min-width: 600px) {
    margin-top: 24px;
    margin-bottom: 0;
  }
`;


const SelectPreview = styled(Select)`
  background: #fff;
  height: 42px;

  && {
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    background: #fff;
    line-height: 120%;
    letter-spacing: 0.15px;
    padding-left: 20px;
    padding-right: 20px;
    color: #000;
    border: none;

    @media screen and (min-width: 600px) {
      height: 64px;
      font-size: 24px;
      padding-left: 15px;
      max-width: 616px;
    }

    & .icon {
      color: #000;
    }
  }
`;


export {
  CustomizedForm,
  SelectPreview
}

export default {
  CustomizedForm,
  SelectPreview
}