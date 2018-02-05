import { h } from 'preact';
import Controls from './Controls.jsx';
import List from './List.jsx';

export default function Markup({ currentPhrase, currentItems, changePhrase }) {
  return (
    <div className="Glossary-wrap">
      <Controls {...{ currentPhrase, currentItems, changePhrase }} />
      <List {...{ currentItems }} />
    </div>
  );
}
