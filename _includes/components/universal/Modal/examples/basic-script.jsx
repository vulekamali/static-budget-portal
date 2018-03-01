import { h, render, Component } from 'preact';
import ExampleComponent from './../index.jsx';


class ExampleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
  }

  setModal(state) {
    this.setState({ modal: state });
  }

  render() {
    const closeModal = () => this.setModal(false);
    const openModal = () => this.setModal(true);

    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <ExampleComponent title="Example Title" closeAction={closeModal} open={this.state.modal}>
          <p>Example description text</p>
        </ExampleComponent>
      </div>
    );
  }
}

function init() {
  const exampleNode = document.getElementById('react-modal-example');
  if (exampleNode) {
    render(
      <ExampleContainer />,
      exampleNode,
    );
  }
}


export default init();

