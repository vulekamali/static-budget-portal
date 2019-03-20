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
  foreignObject {
      font: 10px sans-serif;
      text-align: left;
  }
  foreignObject div {
      word-wrap: break-word;
      text-overflow: ellipsis;
  }
`;

export default GlobalStyle;
