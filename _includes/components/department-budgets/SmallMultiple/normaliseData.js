export default function normaliseData(data) {
  const normaliseLevel2 = (result, { name, total_budget: value }) => ({
    ...result,
    [name]: value,
  });

  const normaliseLevel1 = (result, { name, items, total_budget: value }) => ({
    ...result,
    [name]: Array.isArray(items) ? items.reduce(normaliseLevel2, {}) : value,
  });

  return data.reduce(normaliseLevel1, {});
}
