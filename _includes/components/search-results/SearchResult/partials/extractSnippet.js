import { escape } from 'lodash';


export default function extractSnippet(itemObj) {
  const escapeText = (string) => {
    const withoutMultipleSpaces = string.replace(/\s+/gm, ' ')
    return escape(withoutMultipleSpaces.replace(/[^a-zA-Z0-9]{5,1000}/g, ' '));
  };

  const scanResources = (resourcesList) => {
    for (let i = 0; i < resourcesList.length; i++) {
      const resource = resourcesList[i];

      if (resource.highlighting && resource.highlighting.fulltext) {
        const highlightArray = resource.highlighting.fulltext;

        return {
          url: resource.url,
          text: escapeText(highlightArray[0]),
        };
      }
    }

    return null;
  };

  if (itemObj.resources && itemObj.resources.length > 0) {
    return scanResources(itemObj.resources);
  }

  return null;
}
