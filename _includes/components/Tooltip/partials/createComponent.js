import toTitleCase from './toTitleCase.js';
import closeIcon from './closeIcon.js';

export default function createComponent(phrase, description) {
  return `<span class="Tooltip js-scriptHook">
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
}
