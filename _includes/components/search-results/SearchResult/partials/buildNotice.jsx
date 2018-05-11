import { h } from 'preact';


const calcNoticeObj = (amount, error) => {
  if (error) {
    return {
      size: 'is-1of1',
      title: 'Something went wrong.',
      text: 'Please try again at a later point.',
    };
  }

  switch (amount) {
    case 0: return {
      size: 'is-1of1',
      title: 'We found no results.',
      text: 'Try changing the searched year below, or broaden your search terms',
    };

    case 2: return {
      size: 'is-1of3',
      title: 'We only found 1 result.',
      text: 'Try changing the searched year below, or broaden your search terms.',
    };

    case 3: return {
      size: 'is-2of3',
      title: 'We only found 2 results.',
      text: 'Try changing the searched year below, or broaden your search terms.',
    };

    default: return {
      size: null,
      title: null,
      text: null,
    };
  }
};


export default function buildNotice(error, amount) {
  if (!error && amount >= 3) {
    return null;
  }

  const { size, title: noticeTitle, text: noticeText } = calcNoticeObj(amount, error);

  const className = [
    'Grid-item',
    size,
    'u-textAlignCenter',
    'u-paddingBottom20',
  ].join(' ');

  return (
    <div {...{ className }}>
      <div className="Page-title u-marginBottom0">{noticeTitle}</div>
      <div className="Section-title u-maxWidth300 u-displayInlineBlock u-marginBottom20">{noticeText}</div>
    </div>
  );
}
