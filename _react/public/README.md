

### Getting Started

#### Developing locally

1. Run `git clone https://github.com/OpenUpSA/static-budget-portal.git`
2. Open `_react` folder in root.
3. Make sure you have [NodeJS](https://nodejs.org/en/) installed.
4. Run `npm install`.
5. Run `npm start`*

\* Development server uses hot-reloading. Changes will reflect immediately on localhost:3000 without refreshing the browser.

#### Adding changes to production

1. Follow steps 1-4 above. 
2. Run `npm run build`
3. Get hash number from CSS and JS files at `_react/build/static/`.*
4. Update hash number for JS and CSS in both `_include/jekyll/header.html` and `_include/jekyll/scripts.html`*

\* Will be automated in future versions.

### Stack

Built with [Create React App](https://www.npmjs.com/package/create-react-app) and [Redux](https://redux.js.org/).

Create React App is extended as follows:
- Added support for Sass via [Node Sass Chokidar and NPM Run All](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
- Added [React HTML Connector](https://www.npmjs.com/package/react-html-connector) for easier integration between React and Jekyll Liquid templating language.
- Added [React Markdown](https://www.npmjs.com/package/react-markdown) in order to integrate `README.md` files into pattern library.
- Added [React Addons CSS Transition Group](https://www.npmjs.com/package/react-addons-css-transition-group) to help with animation of components as they are mounted or unmounted
- Added [React Truncate](https://www.npmjs.com/package/react-truncate) in order to keep sizes of the [card UI patterns](https://www.nngroup.com/articles/cards-component/) consistent when the size of the content differs.
- `Set` and `Map` is used from [Core JS](https://www.npmjs.com/package/core-js) in order to [extend support of React 16 to Internet Explorer 10](https://reactjs.org/docs/javascript-environment-requirements.html).
- Added [React GA](https://www.npmjs.com/package/react-ga) for easier integration between React and Google Analytics.

Redux is extended as follows:
- Added [React Redux](https://www.npmjs.com/package/react-redux) for easier integration between React and Redux
- Added [Redux Devtools Extention](redux-devtools-extension) in order to debug Redux inside your browser.

### Conventions

#### React file architecture

- Underlying file architecture foolows [Alix Mangin](https://medium.com/@alexmngn)'s approach layed out in [How to better organize your React applications?](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
- However, since routing is handled by Jekyll the concept of 'scenes' are not used.
- Furthermore, instead of deep-nesting child component folders inside partent components via a 'components' folder, a 'partials' folder is rather used that contains all child dependancies as files (instead of nensted folders).
- In short, components are structured as follows:
  - `index.jsx` The API entry point into the component. This is the file you will `import` when you want to use the component.
  - `styles.scss` This is all styling associated with the component. Gets compiled down via Node Sass Chokidar into a CSS file that gets imported into the component.
  - `README.md`. Written instructions on how to use the component.*
- All components are located in `_react/components` and divided into 'public' and 'private' components:
  - 'private' components are used by other private component or by public components. However, their API is not exposed to the templating langauge (Jekyll).
  - 'public' components are exposed to the templating langauge.
- Public components are imported into `_react/src/index.js` and exposed to the templating language through the React HTML Connect package via HTML data attributes.

#### Redux file architecture
- Redux files are located exclusively in `_react/src/redux`.
- Redux file architecture corresponds to [Ducks Redux convention](https://github.com/erikras/ducks-modular-redux).
- Redux action structure correspond to [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) convention.

#### CSS
- Due to the project's browser support matrix [CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) should be exclusively used for all column/grid configurations. (Refrain from using `float` or `grid`).
- All CSS code follows [SUIT CSS conventions](https://github.com/suitcss/suit/blob/master/doc/README.md).
- Utility classe follows naming conventions used by [Tailwind CSS](http://tailwindcss.com/), however with a `u-` prefix as specified by [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName).

- CSS linting done in accordance with the following Stylelint configs:
  - [stylelint-config-standard](stylelint-config-standard)
  - [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
  - [stylelint-config-css-modules](https://www.npmjs.com/package/stylelint-config-css-modules)
  - [stylelint-no-unsupported-browser-features](https://www.npmjs.com/package/stylelint-no-unsupported-browser-features)

#### JavaScript
- JavaScript linting done in accordance with the following ESLint configs:
  - [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).
  - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react).
  - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
  - [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

#### Support
All code should support the following [Browserlist](http://browserl.ist/) matrix:
- chrome >= 50
- firefox >= 50
- last >= 7
- explorer >= 10
- edge > 0

