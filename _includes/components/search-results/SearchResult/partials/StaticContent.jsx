import { h } from 'preact';
import { compact } from 'lodash';

export default function StaticContent() {
  const video = {
    title: 'Video: Why the budget is important to all South Africans',
    id: 'wnsso3MgvEw',
    url: '/videos?=test',
    open: false,
    count: 1,
  };

  const glossary = {
    title: 'Basic Education',
    description: 'A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure. A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure.',
    url: '/glossary?=test',
    count: 3,
  };

  const calcSize = (total) => {
    switch (total) {
      case 0: return null;
      case 1: return 'is-1of1';
      case 2: return 'is-1of2';
      default: return 'is-1of3';
    }
  };

  const calcTruncate = (total) => {
    switch (total) {
      case 0: return null;
      case 1: return 400;
      case 2: return 300;
      default: return 200;
    }
  };

  const buildButton = (url, count) => {
    if (url && count > 2) {
      return (
        <a className="u-marginTop20 Button is-secondary is-inline" href={url}>
          <span>View all results</span>
          <span className="u-fontWeightNormal">&nbsp;({count} Results)</span>
        </a>
      );
    }

    return null;
  };

  const total = compact([video, glossary]).length;

  const itemCss = [
    'Grid-item',
    calcSize(total),
  ].join(' ');

  const buildGlossary = (title, description, url, count) => {
    return (
      <div className={itemCss}>
        <div className="Section is-invisible u-textAlignCenter">
          <div className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
          <div className="u-fontStyleItalic u-lineHeight16" dangerouslySetInnerHTML={{ __html: `“${description}”` }} />
          {buildButton(url, count)}
        </div>
      </div>
    );
  };

  const buildVideo = (title, id, url, count) => {
    return (
      <div className={itemCss}>
        <div className="Section is-invisible">
          <div className="Section-title">{ title }</div>
          <img className="u-widthFull u-borderRadius10" alt="" src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} />
          <div className="u-textAlignCenter">
            {buildButton(url, count)}
          </div>
        </div>
      </div>
    );
  };

  if (glossary || video) {
    const {
      title: glossaryTitle,
      url: glossaryUrl,
      count: glossaryCount,
      description,
    } = glossary;

    const {
      title: videoTitle,
      url: videoUrl,
      count: videoCount,
      id,
    } = video;

    const truncatedDescription = description.substring(0, calcTruncate(total));

    return (
      <div className="Grid has-standardTrigger">
        <div className="Grid-inner">
          {buildGlossary(glossaryTitle, truncatedDescription, glossaryUrl, glossaryCount)}
          {buildVideo(videoTitle, id, videoUrl, videoCount)}
          {buildGlossary(glossaryTitle, description, glossaryUrl, glossaryCount)}
        </div>
      </div>
    );
  }

  return null;
}
