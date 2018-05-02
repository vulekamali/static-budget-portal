import { h } from 'preact';
import Item from './partials/Item.jsx';
import Modal from './partials/Modal.jsx';
import Controls from './partials/Controls.jsx';


export default function Markup(props) {
  const { items, open, currentPhrase } = props;
  const { setLanguage, changePhrase, setModal } = props;
  const keys = items ? Object.keys(items) : [];

  return (
    <div>
      <Controls {...{ currentPhrase, changePhrase }} />
      <ul className="u-listReset">
        {
          keys.map((key) => {
            const { title, description, languages } = items[key];
            const id = key;
            return (
              <Item
                title={<span dangerouslySetInnerHTML={{ __html: title }} />}
                description={<span dangerouslySetInnerHTML={{ __html: description }} />}
                {...{ key, id, languages, setModal }}
              />
            );
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
