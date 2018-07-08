_Supported IE 10+_

Used to create pop-up modals on page. Should be placed at the top of the page as `      <div data-component="Modal"></div>`. Can only be interfaced with via Redux. `src/redux/modules/modals` has two named exports: `removeModal` and `createModal`.

`removeModal()` indiscrimentaly removes active modal.

`createModal(title, markup)` creates/updates a modal. `title` specifies the modal heading and `markup` specifies the markup that should display in the modal. Both of these params are required for a modal to display.