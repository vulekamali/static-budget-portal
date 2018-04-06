import getProp from './../../../utilities/js/helpers/getProp';


function buildIframe(discourseEmbedUrl, comments) {
  const DE = {
    discourseUrl: 'https://discussions.vulekamali.gov.za/',
    discourseEmbedUrl,
  };

  const iframe = document.createElement('iframe');

  ['discourseUrl', 'discourseEmbedUrl', 'discourseUserName'].forEach((i) => {
    if (window[i]) { DE[i] = DE[i] || window[i]; }
  });

  const queryParams = {};

  if (DE.discourseEmbedUrl) {
    if (DE.discourseEmbedUrl.indexOf('/') === 0) {
      console.error('discourseEmbedUrl must be a full URL, not a relative path');
    }

    queryParams.embed_url = encodeURIComponent(DE.discourseEmbedUrl);
  }

  if (DE.discourseUserName) {
    queryParams.discourse_username = DE.discourseUserName;
  }

  if (DE.topicId) {
    queryParams.topic_id = DE.topicId;
  }

  let src = `${DE.discourseUrl}embed/comments`;
  const keys = Object.keys(queryParams);

  if (keys.length > 0) {
    src += '?';

    for (let i = 0; i < keys.length; i++) {
      if (i > 0) { src += '&'; }

      const k = keys[i];
      src += `${k}=${queryParams[k]}`;
    }
  }

  iframe.src = src;
  iframe.id = 'discourse-embed-frame';
  iframe.width = '100%';
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  comments.appendChild(iframe);

  // Thanks http://amendsoft-javascript.blogspot.ca/2010/04/find-x-and-y-coordinate-of-html-control.html
  function findPosY(obj) {
    let top = 0;
    if (obj.offsetParent) {
      while (1) {
        top += obj.offsetTop;
        if (!obj.offsetParent) {
          break;
        }
        obj = obj.offsetParent;
      }
    } else if (obj.y) {
      top += obj.y;
    }

    return top;
  }

  function normalizeUrl(url) {
    return url.toLowerCase().replace(/^https?(\:\/\/)?/, '');
  }

  function postMessageReceived(e) {
    if (!e) { return; }
    if (normalizeUrl(DE.discourseUrl).indexOf(normalizeUrl(e.origin)) === -1) { return; }

    if (e.data) {
      if (e.data.type === 'discourse-resize' && e.data.height) {
        iframe.height = `${e.data.height}px`;
      }

      if (e.data.type === 'discourse-scroll' && e.data.top) {
        // find iframe offset
        const destY = findPosY(iframe) + e.data.top;
        window.scrollTo(0, destY);
      }
    }
  }
  window.addEventListener('message', postMessageReceived, false);
}


function scripts() {
  const nodesList = document.getElementsByClassName('Comments');

  for (let i = 0; i < nodesList.length; i++) {
    const node = nodesList[i];
    const url = getProp('url', node);

    buildIframe(url, node);
  }
}


export default scripts();
