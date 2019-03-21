import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  rect {
    stroke: white;
  }

  text {
    font-family: Roboto, sans-serif;
    fill: black;
    font-size: 16px;
    font-weight: bold;
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
