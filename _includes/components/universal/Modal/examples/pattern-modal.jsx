import { h, render } from 'preact';
import Modal from './../index.jsx';


function pattern() {
  const basic = document.getElementById('pattern-modal-basic');

  if (basic) {
    render(
      <Modal
        title="Test title"
        closeAction={() => console.log('Close action triggered')}
        open
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida at diam sagittis consequat. Sed dictum magna nunc, hendrerit dignissim sem auctor at. In augue arcu, fringilla a eros at, vulputate facilisis ipsum. Nam euismod tortor arcu, eu suscipit ligula interdum vitae. Suspendisse consequat, augue eget luctus scelerisque, massa nunc luctus nunc, eu efficitur nulla nisl at dolor. Mauris ullamcorper fringilla sapien, et lobortis felis mattis et. Mauris rhoncus neque in aliquet volutpat. Duis egestas ac enim eget condimentum. Phasellus fermentum nulla vel elit luctus, ac consectetur ipsum molestie. Nunc at porta felis. Donec et condimentum neque. Integer ac pretium quam.</p>
        <a href="#" className="Button is-inline">Example button</a>
      </Modal>,
      basic,
    );
  }
}


export default pattern();
