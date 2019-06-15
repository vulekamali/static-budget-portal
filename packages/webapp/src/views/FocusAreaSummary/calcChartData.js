import { sentenceCase } from 'change-case';
import colorsList from './colorsList';

const transformToChartItem = ({ selectedYear, type }) => (data, index) => {
  const { slug: id, title: name, ...otherProps } = data;

  return {
    ...otherProps,
    id,
    name,
    url: `/${selectedYear}/${type}/departments/${id}`,
    color: colorsList[index],
  };
};

const calcChartData = props => {
  const { selectedYear, selectedFocusArea, type, focusAreas, focusAreasIsLoading } = props;

  const { footnotes, notices, total, data = [] } =
    focusAreas.length <= 0 ? {} : focusAreas.find(({ title }) => title === selectedFocusArea)[type];

  return {
    chartData: data.map(transformToChartItem({ selectedYear, type })),
    chartLoading: focusAreasIsLoading,
    chartFooterData: footnotes,
    chartNoticesData: notices,
    initialSelectedValues: {
      name: `Contributing ${sentenceCase(type)} Departments`,
      color: 'grey',
      url: null,
      value: total,
    },
  };
};

export default calcChartData;
