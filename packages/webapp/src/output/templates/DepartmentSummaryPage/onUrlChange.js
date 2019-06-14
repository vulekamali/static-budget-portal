const onUrlChange = ({ selectedYear, slug, sphere, government }) => {
  const newUrl = `/${selectedYear}/previews/${sphere}/${government}/${slug}`;
  window.history.pushState({}, window.document.title, newUrl);
};

export default onUrlChange;
