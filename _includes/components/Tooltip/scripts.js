import glossaryObject from './../../data/glossary.json';
import createComponent from './partials/createComponent.js';
import escapeRegex from './partials/escapeRegex.js';
import toTitleCase from './partials/toTitleCase.js';
import walkTheDom from './partials/walkTheDom.js';

function scripts() {
  const regExpTermsWithOrOperators = Object
    .keys(glossaryObject)
    .sort((a, b) => b.length - a.length)
    .join('|');

  const parentNodes = document.getElementsByClassName('js-tooltips');
  const regExpression = new RegExp(`(?:^|\\b)${escapeRegex(regExpTermsWithOrOperators)}(?!\\w)`, 'gi');


  const replaceText = (node) => {
    if (node.nodeType === 3) {
      const text = node.data.trim();
      if (text.length > 0) {
        const currentText = node.nodeValue;
        const span = document.createElement('span');
        const newText = currentText.replace(
          regExpression,
          (match) => {
            return createComponent(match, glossaryObject[toTitleCase(match)]);
          },
        );

        span.innerHTML = newText;
        node.parentNode.replaceChild(span, node);
      }
    }
  };

  for (let i = 0; i < parentNodes.length; i++) {
    console.log(parentNodes[i]);
    walkTheDom(
      parentNodes[i],
      replaceText,
    );
  }
}


export default scripts();
