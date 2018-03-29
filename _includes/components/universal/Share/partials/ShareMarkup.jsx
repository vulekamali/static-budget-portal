import { h } from 'preact';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';
import Button from './Button.jsx';
import Modal from './../../../universal/Modal/index.jsx';


const hardCoded = {
  'as Link': 'copy',
  'on Facebook': 'facebook',
  'on Twitter': 'twitter',
};


export default function ShareMarkup({ selected, updateShare, modal, shareOpen, updateModal }) {
  const closeModal = () => updateModal(false);

  return (
    <div className="Share-wrap">

      <Modal
        title="Share this link:"
        open={modal}
        closeAction={closeModal}
      >
        <a className="u-wordBreakBreakAll" href={window.location.href}>
          {window.location.href}
        </a>
      </Modal>

      <div className="Share-action">
        <div className="Share-select">
          <PseudoSelect
            name="share"
            items={hardCoded}
            selected={selected}
            open={shareOpen}
            changeAction={value => updateShare(value)}
          />
        </div>
        <div className="Share-button">
          <Button {...{ selected, updateModal }} />
        </div>
      </div>

    </div>
  );
}
