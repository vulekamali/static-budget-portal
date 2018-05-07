export default function createComponents(nameString, callback, enhance) {
  const type = enhance ? 'enhance' : 'create';
  const nodesList = document.querySelectorAll(`[data-${type}-component="${nameString}"]`);

  for (let i = 0; i < nodesList.length; i++) {
    const node = nodesList[i];
    callback(node);
  }
}
