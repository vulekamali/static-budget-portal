import { Tdata, TtransformedData } from './types';

const outputNational = (items: Tdata): TtransformedData =>
  items.map(props => {
    const { slug: id, detail: url, percentage_of_total: percentage, ...otherProps } = props;
    return { id, url, percentage, ...otherProps };
  });

export default outputNational;
