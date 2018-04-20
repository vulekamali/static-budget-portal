import { h, render, Component } from 'preact';
import store from './../../../store.js';
import Modal from './index.jsx';


class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      markup: null,
    };

    this.events = {
      closeModal: this.closeModal.bind(this),
    };

    store.subscribe(() => {
      const storeState = store.getState();

      if (!storeState.modal) {
        return this.setState({
          ...this.state,
          title: null,
          markup: null,
        });
      }

      if (
        storeState.modal.title !== this.state.title &&
        storeState.modal.markup !== this.state.markdown
      ) {
        return this.setState({
          ...this.state,
          title: storeState.modal.title,
          markup: storeState.modal.markup,
        });
      }

      return null;
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      title: null,
      markup: null,
    });
  }

  render() {
    const { title, markup } = this.state;
    const { closeModal } = this.events;
    return <Modal {...{ title, markup, closeModal }} />;
  }
}


function scripts() {
  const nodesList = document.getElementsByClassName('js-initModals');

  for (let i = 0; i < nodesList.length; i++) {
    const node = nodesList[i];

    render(
      <ModalContainer {...{ store }} />,
      node,
    );
  }
}


export default scripts();
