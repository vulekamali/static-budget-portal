import camelCase from 'camelcase';
import glossaryObject from './../../data/glossary.json';
import createComponent from './partials/createComponent.js';
import escapeRegex from './partials/escapeRegex.js';
import toTitleCase from './partials/toTitleCase.js';
import walkTheDom from './partials/walkTheDom.js';

function scripts() {
  const convertToCamelCase = (rawObject) => {
    return Object.keys(glossaryObject).reduce(
      (result, key) => {
        return {
          ...result,
          [camelCase(key)]: glossaryObject[key],
        };
      },
      {},
    );
  };

  const normalisedGlossaryObject = convertToCamelCase(glossaryObject);

  const regExpTermsWithOrOperators = Object
    .keys(glossaryObject)
    .sort((a, b) => b.length - a.length)
    .join('|');

  const parentNodes = document.getElementsByClassName('js-tooltips');
  const regExpression = new RegExp(`(?:^|\\b)${escapeRegex(regExpTermsWithOrOperators)}(?!\\w)`, 'gi');


  const attachEventListeners = (tooltipNode) => {
    const openTrigger = tooltipNode.getElementsByClassName('js-openTrigger')[0];
    const closeTrigger = tooltipNode.getElementsByClassName('js-closeTrigger')[0];
    const alertNode = tooltipNode.getElementsByClassName('js-alert')[0];

    const openTooltip = () => alertNode.classList.add('is-open');
    const closeTooltip = () => alertNode.classList.remove('is-open');

    openTrigger.addEventListener('click', openTooltip);
    closeTrigger.addEventListener('click', closeTooltip);
  };

  const replaceText = (node) => {
    if (node.nodeType === 3) {
      const text = node.data.trim();
      if (text.length > 0) {
        const currentText = node.nodeValue;
        const span = document.createElement('span');
        const newText = currentText.replace(
          regExpression,
          (match) => {
            return createComponent(match, normalisedGlossaryObject[camelCase(match)]);
          },
        );

        span.innerHTML = newText;
        node.parentNode.replaceChild(span, node);
      }
    }
  };

  for (let i = 0; i < parentNodes.length; i++) {
    const parentNode = parentNodes[i];

    walkTheDom(
      parentNode,
      replaceText,
    );

    const newNodes = parentNode.getElementsByClassName('Tooltip js-scriptHook');

    for (let ii = 0; ii < newNodes.length; ii++) {
      attachEventListeners(newNodes[ii]);
    }
  }
}


export default scripts();
