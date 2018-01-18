function scripts() {
  const nodes = document.getElementsByClassName('Intro');
  const nodesArray = [...nodes];

  nodesArray.forEach((node, i) => {
    const trigger = nodes[i].getElementsByClassName('js-alertTrigger')[0];
    const alert = nodes[i].getElementsByClassName('js-alert')[0];
    const close = nodes[i].getElementsByClassName('js-close')[0];
    const modalBackground = nodes[i].getElementsByClassName('js-modalBackground')[0];

    const displayAlert = () => {
      alert.classList.add('is-active');
    };

    const removeAlert = () => {
      alert.classList.remove('is-active');
    };

    trigger.addEventListener('click', displayAlert);
    close.addEventListener('click', removeAlert);
    modalBackground.addEventListener('click', removeAlert);
  });
}


export default scripts();
