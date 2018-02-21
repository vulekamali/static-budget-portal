import { h } from 'preact';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';
import Button from './Button.jsx';
import Modal from './../../../universal/Modal/index.jsx';


const hardCoded = [
  {
    value: 'copy',
    title: 'as Link',
  },
  {
    value: 'facebook',
    title: 'on Facebook',
  },
  {
    value: 'twitter',
    title: 'on Twitter',
  },
];

export default function ShareMarkup({ selected, updateShare, modal, shareOpen, updateModal }) {
  const closeModal = () => updateModal(false);

  return (
    <div className="Share-wrap">

      <Modal
        title="Share this link:"
        description={window.location.href}
        open={modal}
        block
        forceWrap
        openAction={null}
        closeAction={closeModal}
      >

        <div className="Share-title">Share page</div>
        <div className="Share-action">
          <div className="Share-select">
            <PseudoSelect
              name="share"
              items={hardCoded}
              property={selected}
              open={shareOpen}
              changeAction={value => updateShare(value)}
            />
          </div>
          <div className="Share-button">
            <Button {...{ selected, updateModal }} />
          </div>
        </div>

      </Modal>

    </div>
  );
}
