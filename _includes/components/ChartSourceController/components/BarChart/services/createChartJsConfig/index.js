/* eslint no-param-reassign: 0 */


import Chart from 'chart.js';
import trimValues from '../../../../../../utilities/js/helpers/trimValues.js';


const calcIfObject = value => value !== null && typeof value === 'object';


const recursiveHeadingOverrides = (result, obj) => {
  Object.keys(obj).forEach((key) => {
    if (calcIfObject(obj[key])) {
      result.labels.push(`heading: ${key}`);
      result.values.push(0);

      return recursiveHeadingOverrides(result, obj[key]);
    }

    result.labels.push(key);
    result.values.push(obj[key]);
    return null;
  });
};


const flattenNesting = (obj) => {
  const result = { labels: [], values: [] };
  recursiveHeadingOverrides(result, obj);
  return result;
};

const calcLabelPosition = (height, x, y, maxWidth) => {
  if (x > maxWidth / 2) {
    return {
      textX: x - (height / 3),
      textY: y - 6,
      align: 'right',
      color: 'black',
      space: x - (((height / 3) * 2) + 20),
    };
  }

  return {
    textX: x + (height / 3),
    textY: y - 6,
    align: 'left',
    color: 'black',
    space: maxWidth - (x + (((height / 3) * 2) + 20)),
  };
};


const calcLabelTruncate = (target, space, label) => {
  let truncatedLabel = label;

  if (target.measureText(truncatedLabel).width < space) {
    return truncatedLabel;
  }

  for (let characters = label.length; characters >= 0; characters--) {
    truncatedLabel = truncatedLabel.substring(0, characters);
    if (target.measureText(truncatedLabel).width < space) {
      break;
    }
  }

  return `${truncatedLabel}...`;
};


const createModifyLabel = (target, fontString) => ({ label, height, x, y, maxWidth }) => {
  const { textX, textY, align, color, space } = calcLabelPosition(height, x, y, maxWidth);
  const fontFallbacks = '\'Source Sans\', sans-serif';

  const regexArray = label.match(/(^heading:\s)(.+)/im);
  const isHeading = /(^heading:\s)(.+)/im.test(label);
  const labelAfterHeadingCheck = isHeading ? regexArray[2] : label;
  const fontStyle = isHeading ? fontString(14, 'bold', fontFallbacks) : fontString(11, 'normal', fontFallbacks);

  const truncatedLabel = calcLabelTruncate(target, space, labelAfterHeadingCheck);

  target.font = fontStyle;
  target.textBaseline = 'top';
  target.fillStyle = isHeading ? 'grey' : color;
  target.textAlign = align;
  target.fillText(truncatedLabel, isHeading ? 0 : textX, isHeading ? textY + 3 : textY);
};


const dynamicLabelPlugin = ({ chart }) => {
  const barInfo = chart.getDatasetMeta(0).data;
  const modifyLabel = createModifyLabel(chart.ctx, Chart.helpers.fontString);

  barInfo.forEach((bar) => {
    const { _xScale, _model } = bar;

    const { maxWidth } = _xScale;
    const { x, y, label, height } = _model;
    modifyLabel({ label, height, x, y, maxWidth });
  });
};


const createChartJsConfig = ({ items, rotated, color }) => {
  const { labels, values } = flattenNesting(items);

  return {
    type: rotated ? 'bar' : 'horizontalBar',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: color,
        },
      ],
    },
    options: {
      barThickness: 10,
      maintainAspectRatio: false,
      tooltips: {
        intersect: false,
        custom: (tooltip) => {
          if (!tooltip || /(^heading:\s)(.+)/im.test(tooltip.title)) {
            tooltip.opacity = 0;
            return;
          }
          tooltip.displayColors = false;
        },
        callbacks: {
          label: (item, dataObject) => {
            const { index } = item;
            const { data } = dataObject.datasets[0];
            return `R${trimValues(data[index])}`;
          },
        },
      },
      animation: {
        duration: 0,
      },
      layout: {
        padding: {
          top: 15,
          bottom: 15,
        },
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          display: rotated || false,
          gridLines: {
            display: false,
          },
          ticks: {
            display: rotated || false,
            beginAtZero: true,
            maxRotation: 0,
            callback: value => (rotated ? `R${trimValues(value)}` : value),
          },
          barPercentage: 0.8,
          categoryPercentage: 1.0,
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            maxRotation: 0,
            callback: value => (rotated ? value : `R${trimValues(value)}`),
          },
          gridLines: {
            display: false,
          },
        }],
      },
    },
    plugins: [
      {
        afterDatasetsDraw: rotated || dynamicLabelPlugin,
      },
    ],
  };
};


export default createChartJsConfig;
