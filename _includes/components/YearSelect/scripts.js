function UtilityBar() {
  const nodes = document.getElementsByClassName('YearSelect');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const dropdown = node.getElementsByClassName('js-dropdown')[0];
      const toggle = () => dropdown.classList.toggle('is-open');
      dropdown.addEventListener('click', toggle);
    });
  }
}


export default UtilityBar();
