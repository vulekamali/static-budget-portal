import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  rect {
    fill: cadetblue;
    opacity: 0.3;
    stroke: white;
  }

  text {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    fill: white;
    font-size: 10px;
  }

  .labelbody {
      margin: 2px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
