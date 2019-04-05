import styled from 'styled-components';

import { FormControl, Select } from '@material-ui/core';

const CustomizedForm = styled.div`
  width: 50%;

  @media screen and (max-width: 675px) {
    width: 65%;
  }
`;

const FormControlDateCtrl = styled(FormControl)`
  ${'' /* Check if styling is taking on */}
  font-weight: 700;
  width: 94%;
`;

const SelectPreviewDate = styled(Select)`
  && {
    width: 100%;
    background: #d8d8d8;
    border-radius: 3px;
    padding: 16px 12px 16px 16px;
    font-size: 14px;
    line-height: 120%;
    color: #000;

    & .disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    & .icon {
      color: rgba(0, 0, 0, 0.26);
    }

    @media screen and (min-width: 600px) {
      font-size: 20px;
      padding: 24px 16px 24px 24px;
      width: auto;
    }
  }
`;


export {
  CustomizedForm,
  FormControlDateCtrl,
  SelectPreviewDate
}

export default {
  CustomizedForm,
  FormControlDateCtrl,
  SelectPreviewDate
}
