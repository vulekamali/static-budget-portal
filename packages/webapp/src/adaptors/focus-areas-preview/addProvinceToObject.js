const addProvinceToObject = provincialData => {
  if (provincialData.length === 0) {
    return {};
  }

  return [
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
    const children = provincialData
      .filter(item => item.province === provinceName)
      .map(({ slug, percentage_of_total: percentage, url, ...data }) => ({
        ...data,
        id: slug,
        percentage,
        url: url && `/${url}`,
      }));

    const amount = children.reduce(
      (innerResult, { amount: innerAmount }) => innerResult + innerAmount,
      0,
    );

    return {
      ...result,
      [provinceName]: {
        name: provinceName,
        amount,
        children,
      },
    };
  }, {});
};

export default addProvinceToObject;
