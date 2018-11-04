const wrapInHeaderAndFooter = ({ canvas, height }) => {
  const memoryCanvas = document.createElement('canvas');
  memoryCanvas.height = height + 260;
  memoryCanvas.width = 900;
  const context = memoryCanvas.getContext('2d');

  context.rect(0, 0, 900, height + 260);
  context.fillStyle = 'white';
  context.fill();

  context.font = 'bold 32px Lato, sans-serif';
  context.fillStyle = '#ee9f31';
  context.fillText('Communications', 50, 60);

  context.font = '18px Lato, sans-serif';
  context.fillStyle = 'grey';
  context.fillText('Health Department Budget for 2018-19', 50, 100);

  context.fillStyle = '#7bb344';
  context.fillText('Expenditure changes over time chart', 50, 120);

  context.drawImage(canvas, 50, 150);

  context.font = '18px Lato, sans-serif';
  context.fillStyle = '#ee9f31';
  context.fillText('Downloaded from vulekamali.gov.za', 50, 190 + height);

  return memoryCanvas;
};


const download = ({ memoryCanvas }) => {
  if (memoryCanvas.msToBlob) {
    const blob = memoryCanvas.msToBlob();
    return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 1, scaleHeight: 1 });
  }

  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = memoryCanvas.toDataURL();
  link.setAttribute('type', 'hidden');
  document.body.appendChild(link);
  link.click();

  return null;
};


const downloadChart = ({ canvas, height }) => {
  const memoryCanvas = wrapInHeaderAndFooter({ canvas, height });
  download({ memoryCanvas });
};


export default downloadChart;
