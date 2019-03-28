import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 20px;

  @media screen and (min-width: 450px) {
    margin: 70px 20px;
  }
`;

const BarChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;


export {
  Wrapper,
  BarChartContainer
}

export default {
  Wrapper,
  BarChartContainer
}
