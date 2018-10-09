export default function normaliseData(data) {
  const normaliseLevel2 = (result, { name, total_budget: value }) => ({
    ...result,
    [name]: value,
  });

  const normaliseLevel1 = (result, { name, items }) => ({
    ...result,
    [name]: items.reduce(normaliseLevel2, {}),
  });

  return data.reduce(normaliseLevel1, {});
}
