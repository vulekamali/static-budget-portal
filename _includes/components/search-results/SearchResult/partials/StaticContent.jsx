import { h } from 'preact';
import { compact } from 'lodash';


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
  if (url && count > 1) {
    return (
      <a className="u-marginTop20 Button is-secondary is-inline" href={url}>
        <span>View all results</span>
        <span className="u-fontWeightNormal">&nbsp;({count} Results)</span>
      </a>
    );
  }

  return null;
};


const buildGlossary = ({ title, url, count, description }, total) => {
  const truncatedDescription = description.substring(0, calcTruncate(total));
  const itemCss = [
    'Grid-item',
    calcSize(total),
  ].join(' ');

  return (
    <div className={itemCss}>
      <div className="Section is-invisible u-textAlignCenter">
        <div className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="u-fontStyleItalic u-lineHeight16" dangerouslySetInnerHTML={{ __html: `“${truncatedDescription}”` }} />
        {buildButton(url, count)}
      </div>
    </div>
  );
};


const buildVideo = ({ title, url, count, id }, total) => {
  const itemCss = [
    'Grid-item',
    calcSize(total),
  ].join(' ');

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

export default function StaticContent({ video, glossary }) {
  const total = compact([video, glossary]).length;

  if (total < 1) {
    return null;
  }

  return (
    <div className="Grid has-standardTrigger">
      <div className="Grid-inner">
        {glossary ? buildGlossary(glossary, total) : null}
        {video ? buildVideo(video, total) : null}
      </div>
    </div>
  );
}
