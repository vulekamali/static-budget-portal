const transformData = ({ total, items }) => {
  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'Western Cape',
    'North West',
    'KwaZulu-Natal',
  ].reduce((result, provinceName) => {
    const children = items
      .filter(item => item.province === provinceName)
      .map(({ slug, percentage_of_total: percentage, ...data }) => ({
        ...data,
        id: slug,
        percentage,
      }));

    const amount = children.reduce(
      (innerResult, { amount: innerAmount }) => innerResult + innerAmount,
      0,
    );
    const percentage = (amount / total) * 100;

    return {
      ...result,
      [provinceName]: {
        name: provinceName,
        amount,
        percentage,
        children,
      },
    };
  }, {});

  return { total, items: provinces };
};

export default transformData;
