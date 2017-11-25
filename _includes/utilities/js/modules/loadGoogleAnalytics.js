function loadGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];

  const gtag = () => window.dataLayer.push(arguments);

  gtag('js', new Date());
  gtag('config', 'UA-93649482-8');
}


export default loadGoogleAnalytics();
