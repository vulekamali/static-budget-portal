function scripts() {
  const searchList = document.getElementsByClassName('Search');
  const navBarList = document.getElementsByClassName('NavBar');

  if (searchList.length > 0 && navBarList.length > 0) {
    const navBar = navBarList[0] || null;
    const search = searchList[0] || null;
    const searchWrapList = search ? search.getElementsByClassName('js-searchWrap') : null;
    const searchWrap = searchWrapList[0] || null;
    const mobileIconList = search ? search.getElementsByClassName('js-mobileIcon') : null;
    const closeIconList = navBarList[0] ? navBarList[0].getElementsByClassName('js-closeIcon') : null;
    const mobileIcon = mobileIconList[0] || null;
    const closeIcon = closeIconList[0] || null;
    const searchIconList = search ? search.getElementsByClassName('js-searchIcon') : null;
    const searchIconCloseList = search ? search.getElementsByClassName('js-searchIconClose') : null;
    const searchIcon = searchIconList[0] || null;
    const searchIconClose = searchIconCloseList[0] || null;


    if (mobileIcon && closeIcon && searchIcon && searchIconClose) {
      const closeNavBar = () => {
        navBar.classList.remove('is-active');
        document.body.classList.remove('has-overlay');
      };

      const openNavBar = () => {
        navBar.classList.add('is-active');
        document.body.classList.add('has-overlay');
      };

      const closeSearch = () => {
        searchWrap.classList.remove('is-active');
        document.body.classList.remove('has-overlay');
      };

      const openSearch = () => {
        searchWrap.classList.add('is-active');
        document.body.classList.add('has-overlay');
      };

      mobileIcon.addEventListener('click', openNavBar);
      closeIcon.addEventListener('click', closeNavBar);

      searchIcon.addEventListener('click', openSearch);
      searchIconClose.addEventListener('click', closeSearch);
    }
  }
}


export default scripts();
