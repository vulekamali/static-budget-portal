import { h, render } from 'preact';
import Modal from './../index.jsx';


function docScripts() {
  const component = document.getElementById('component-example-91252934');

  render(
    <Modal
      title="Test Title"
      open
      closeAction={() => console.log('Close Modal')}
    >
      <p>Hello World!</p>
    </Modal>,
    component,
  );
}


export default docScripts();
