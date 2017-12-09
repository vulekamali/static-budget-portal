class AboutPageScrollEvents {
  // ...
  constructor(boxNode, linksNodeList, sectionsNodeList, scrollableNodes) {
    // static values
    this.boxNode = boxNode;
    this.boxPosition = boxNode.offsetTop;
    this.linksNodeList = linksNodeList;
    this.sectionsNodeList = sectionsNodeList;

    // stateful values
    this.selectedLink = {
      value: null,
      changed: false,
    };
    this.previousSelectedLink = {
      value: null,
      changed: false,
    };
    this.boxNodeFixed = {
      value: false,
      changed: false,
    };
    this.scrollTimeout = {
      value: null,
    };

    // helper methods
    this.calcNodeViewportPosition = (node, scrollPosition) => {
      const nodeAbsolutePostion = node.offsetTop;
      return scrollPosition - nodeAbsolutePostion;
    };

    this.updateStateDebounce();
    this.addLinksEventListeners();
  }


  addLinksEventListeners() {
    const linksNodeArray = [...this.linksNodeList];

    linksNodeArray.forEach((node, i) => {
      if (node.classList.contains('js-scroll')) {
        const eventFnWrapper = (event) => {
          event.preventDefault();

          window.scroll({
            top: this.sectionsNodeList[i].offsetTop - 100,
            behavior: 'smooth',
          });
        };

        node.addEventListener('click', eventFnWrapper);
      }
    });
  }


  // ...
  findCurrentViewedSection(scrollPosition) {
    const pageMiddle = (window.innerHeight / 3);

    for (let i = this.sectionsNodeList.length - 1; i >= 0; i--) {
      const nodePositionFromTop = this.calcNodeViewportPosition(this.sectionsNodeList[i], scrollPosition);
      const nodeFromMiddle = nodePositionFromTop + pageMiddle;

      if (nodeFromMiddle >= 0) {
        return i;
      }
    }
    return 0;
  }


  // ...
  updateState() {
    const scrollPosition = document.body.scrollTop;
    const currentScrolledSection = this.findCurrentViewedSection(scrollPosition);

    if (currentScrolledSection !== this.selectedLink.value) {
      this.previousSelectedLink = {
        ...this.previousSelectedLink,
        value: this.selectedLink.value || 0,
        changed: true,
      };

      this.selectedLink = {
        ...this.selectedLink,
        value: currentScrolledSection,
        changed: true,
      };
    }

    if (this.boxNodeFixed.value === false && scrollPosition - this.boxPosition > -50) {
      this.boxNodeFixed = {
        ...this.boxNodeFixed,
        value: true,
        changed: true,
      };
    } else if (this.boxNodeFixed.value === true && scrollPosition - this.boxPosition < -50) {
      this.boxNodeFixed = {
        ...this.boxNodeFixed,
        value: false,
        changed: true,
      };
    }

    this.updatePresentation();
  }

  // ...
  updateStateDebounce() {
    if (this.scrollTimeout.value) {
      clearTimeout(this.scrollTimeout.value);
    }

    const updateStateWrap = () => this.updateState();
    this.scrollTimeout.value = setTimeout(updateStateWrap, 10);
  }


  updatePresentation() {
    if (this.selectedLink.changed) {
      this.linksNodeList[this.selectedLink.value].classList.add('is-active');
      this.selectedLink.changed = false;
    }

    if (this.previousSelectedLink.changed) {
      if (this.selectedLink.value > 0) {
        this.linksNodeList[0].classList.remove('is-active');
      }

      if (this.previousSelectedLink.value) {
        this.linksNodeList[this.previousSelectedLink.value].classList.remove('is-active');
      }
      this.previousSelectedLink.changed = false;
    }

    if (this.boxNodeFixed.changed) {
      if (this.boxNodeFixed.value === true) {
        this.boxNode.classList.add('is-fixed');
        this.boxNodeFixed.changed = false;
      }

      if (this.boxNodeFixed.value === false) {
        this.boxNode.classList.remove('is-fixed');
        this.boxNodeFixed.changed = false;
      }
    }
  }
}


function scripts() {
  const node = document.getElementsByClassName('About');
  const otherNode = document.getElementsByClassName('NavBar');

  if (node.length > 0 && otherNode.length > 0) {
    const linksNodeList = otherNode[0] ? otherNode[0].getElementsByClassName('js-link') : null;
    const sectionsNodeList = node[0] ? node[0].getElementsByClassName('js-section') : null;
    const scrollNodeList = otherNode[0] ? otherNode[0].getElementsByClassName('js-scroll') : null;
    const boxNode = otherNode[0] ? otherNode[0].getElementsByClassName('js-box')[0] : null;

    if (linksNodeList && sectionsNodeList && boxNode) {
      const scrollListenerEvent = new AboutPageScrollEvents(
        boxNode,
        linksNodeList,
        sectionsNodeList,
        scrollNodeList,
      );

      const scrollListenerEventWrapper = () => scrollListenerEvent.updateStateDebounce();

      window.addEventListener('scroll', scrollListenerEventWrapper);
    }
  }
}


export default scripts();
