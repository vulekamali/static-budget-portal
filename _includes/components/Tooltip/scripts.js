import { data } from './list.json';
import toTitleCase from './partials/toTitleCase.js';
import closeIcon from './partials/closeIcon.js';


function Tooltip() {
  const createComponent = ({ phrase, description }) => {
    return `<span class="Tooltip">
      <span class="Tooltip-phrase js-openTrigger">${phrase}</span>
      <div class="Tooltip-boxWrap js-alert">
        <div class="Tooltip-box">
          <div class="Tooltip-content">
            <div class="Tooltip-shadowBox">
              <div class="Tooltip-title">${toTitleCase(phrase)}</div>
              <div class="Tooltip-text">${description}</div>
              <span class="Tooltip-linkWrap js-closeTrigger">
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
    const nodesArray = [...nodes];

    nodesArray.forEach((node, index) => {
      data.forEach(({ phrase, description }) => {
        const result = nodes[index].innerHTML.replace(
          new RegExp(phrase, 'gi'),
          createComponent({ phrase, description }),
        );

        nodes[index].innerHTML = result;

        const newNodes = nodes[index].getElementsByClassName('Tooltip');
        const newNodesArray = [...newNodes];

        newNodesArray.forEach((newNode) => {
          const openTrigger = newNode.getElementsByClassName('js-openTrigger')[0];
          const closeTrigger = newNode.getElementsByClassName('js-closeTrigger')[0];
          const alertNode = newNode.getElementsByClassName('js-alert')[0];

          const openTooltip = () => alertNode.classList.add('is-open');
          const closeTooltip = () => alertNode.classList.remove('is-open');

          openTrigger.addEventListener('click', openTooltip);
          closeTrigger.addEventListener('click', closeTooltip);
        });
      });
    });
  };

  return replacePhrasesWithComponents();
}


export default Tooltip();
