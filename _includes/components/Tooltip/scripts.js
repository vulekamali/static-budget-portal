import { data } from './list.json';
import toTitleCase from './partials/toTitleCase.js';
import closeIcon from './partials/closeIcon.js';


function Tooltip() {
  const createComponent = ({ phrase, description }) => {
    return `<span class="Tooltip-boxWrap">
      <span class="">${phrase}</span>
        <div class="Tooltip-boxWrap">
          <div class="Tooltip-box">
            <div class="Tooltip-content">
              <div class="Tooltip-shadowBox">
                <div class="Tooltip-title">${toTitleCase(phrase)}</div>
                <div class="Tooltip-text">${description}</div>
                <span class="Tooltip-linkWrap js-close">
                  <span>${closeIcon}</span>
                  <span class="Tooltip-link">Close</span>
                </a>
                <div class="Tooltip-triangleWrap">
                  <div class="Tooltip-triangle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </span>`;
  };

  const replacePhrasesWithComponents = () => {
    const nodes = document.getElementsByClassName('js-tooltips');

    for (let i = 0; i < nodes.length; i + 1) {
      data.forEach(({ phrase, description }) => {
        const result = nodes[i].innerHTML.replace(
          new RegExp(data.phrase, 'gi'),
          createComponent({ phrase, description }),
        );
        nodes[i].innerHTML = result;
      });
    }
  };

  return replacePhrasesWithComponents();
}


export default Tooltip();
