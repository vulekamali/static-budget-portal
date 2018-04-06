import Fuse from 'fuse.js';


export default function filterKeywords(keywords, results) {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'name',
    ],
  };

  return results.map((group) => {
    const items = new Fuse(group.departments, options);

    return {
      ...group,
      departments: items.search(keywords),
    };
  });
}
