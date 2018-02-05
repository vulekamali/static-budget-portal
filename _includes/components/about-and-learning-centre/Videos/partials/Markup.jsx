import { h } from 'preact';
import Item from './Item.jsx';
import Modal from './Modal.jsx';
import Controls from './Controls.jsx';


export default function Markup(props) {
  const { items, open, currentPhrase } = props;
  const { setLanguage, changePhrase, setModal } = props;
  const keys = Object.keys(items);

  return (
    <div>
      <Controls {...{ currentPhrase, changePhrase }} />
      <ul className="u-listReset">
        {
          keys.map((key) => {
            const { title, description, languages } = items[key];
            const id = key;
            return <Item {...{ key, id, title, description, languages, setModal }} />;
          })
        }
      </ul>
      { open ?
        <Modal
          open={open}
          title={items[open.id].title}
          description={items[open.id].description}
          languageOptions={items[open.id].languages}
          {...{ setModal, setLanguage }}
        />
        : null
      }
    </div>
  );
}
