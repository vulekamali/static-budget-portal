import { h } from 'preact';


const createLinkText = (sphere, string) => {
  switch (sphere) {
    case 'national': return 'Estimates of National Expenditure (ENE)';
    case 'provincial': return 'Estimates of Provincial Revenue and Expenditure (EPRE)';
    case 'cso': return string;
    default: return null;
  }
}

const buildSnippet = (snippet, tab) => {
  if (tab === 'cso' && !snippet.organization) {
    return null;
  }
  return (
    <div>
      <div className="u-marginBottom20 u-lineHeight16" dangerouslySetInnerHTML={{ __html: snippet.text }} />
      <div>
        <span>Source:&nbsp;</span>
        <a target="_blank" href={snippet.url}>{createLinkText(tab, snippet.organization)}</a>
      </div>
    </div>
  );
};


export default function ItemPreview({ title, url, snippet, tab, paddingOverride }) {
  return (
    <div key={url} className={`Section u-marginBottom20 is-invisible${paddingOverride ? ' u-padding0' : ''}`}>
      <a href={url} className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {snippet ? buildSnippet(snippet, tab) : null}
    </div>
  );
}
