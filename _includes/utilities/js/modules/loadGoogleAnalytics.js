import analyticsEvent from './../helpers/analyticsEvent.js';

function loadGoogleAnalytics() {
  window.dataLayer = [
    ['js', new Date()],
    ['config', 'UA-93649482-8'],
  ];

  if ('addEventListener' in window) {
    window.addEventListener('error', (event) => {
      analyticsEvent(
        'send',
        'exception',
        {
          exDescription: `${event.message} @ ${event.filename}: ${event.lineno}`,
          exFatal: true,
        },
      );
    });
  }

  return null;
}


export default loadGoogleAnalytics();
