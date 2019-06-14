const onUrlChange = ({ selectedYear, slug }) => {
  const newUrl = `/${selectedYear}/previews/focus/${slug}`;
  window.history.pushState({}, window.document.title, newUrl);
};

export default onUrlChange;
