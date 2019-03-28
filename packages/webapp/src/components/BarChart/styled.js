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

const BarChartTotal = styled.div`
  display: flex;
  ${'' /* flex-wrap: wrap; */}
  width: 100%;
  height: 75px;
  margin-bottom: 10px;
`;

const ColorBar = styled.div`
  width: 70%;
  background-color: #e57373;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const RemainderBar = styled.div`
  width: 30%;
  background-color: #f7f7f7;
`;

export {
  Wrapper,
  BarChartContainer,
  BarChartTotal,
  ColorBar,
  RemainderBar
}

export default {
  Wrapper,
  BarChartContainer,
  BarChartTotal,
  ColorBar,
  RemainderBar
}
