export default function normaliseData(data) {
  const normaliseLevel2 = (result, { economic_classification_2_name: key, total_budget: value }) => ({
    ...result,
    [key]: value,
  });

  const normaliseLevel1 = (result, { economic_classification_1_name: key, items }) => ({
    ...result,
    [key]: items.reduce(normaliseLevel2, {}),
  });

  return data.reduce(normaliseLevel1, {});
}
