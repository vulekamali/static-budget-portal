function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const closeIcon = '<svg version="1.2" width="10" height="10" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M58.3 50.4L96.7 12c2.4-2.4 2.4-6.2 0-8.6C94.3 1 90.5 1 88 3.4L49.8 41.8 11.3 3.4C9 1 5 1 2.7 3.4.3 5.8.3 9.6 2.7 12L41 50.4 2.8 88.8C.3 91.2.3 95 2.7 97.4 4 98.6 5.5 99.2 7 99.2c1.6 0 3-.6 4.3-1.8L49.7 59 88 97.4c1.3 1.2 3 1.8 4.4 1.8 1.6 0 3-.6 4.3-1.8 2.4-2.4 2.4-6.2 0-8.6L58.3 50.4zm0 0"></path></svg>';

function Tooltip() {
  const nodes = document.getElementsByClassName('js-tooltips');


  const nodes = document.getElementsByClassName('Tooltip');
  const nodesArray = [...nodes];

  nodesArray.forEach((node, i) => {
    const text = nodes[i].getAttribute('data-text');
    const title = nodes[i].innerHTML;

    const deleteTooltip = () => {
      const boxWrap = nodes[i].getElementsByClassName('Tooltip-boxWrap')[0];
      boxWrap.remove();
    };

    const createTooltip = () => {
      nodes[i].innerHTML = `
        ${title}
        <div class="Tooltip-boxWrap">
          <div class="Tooltip-box">
            <div class="Tooltip-content">
              <div class="Tooltip-shadowBox">
                <div class="Tooltip-title">${toTitleCase(title)}</div>
                <div class="Tooltip-text">${text}</div>
                <!-- <a href="#" class="Tooltip-link">View full glossary</a> -->
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
        </div>`;
    };

    const toggleState = () => {
      if (!nodes[i].classList.contains('is-open')) {
        nodes[i].classList.add('is-open');
        createTooltip();

        const close = nodes[i].getElementsByClassName('js-close')[0];

        const deleteEvent = () => {
          if (nodes[i].classList.contains('is-open')) {
            nodes[i].classList.remove('is-open');
            deleteTooltip();
          }
        };
        close.addEventListener('click', deleteEvent);
      }
    };

    nodes[i].addEventListener('click', toggleState);
  });
}

export default Tooltip();
