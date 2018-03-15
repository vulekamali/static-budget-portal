import { h } from 'preact';
import PseudoSelect from './../../universal/PseudoSelect/index.jsx';
import fullMonthName from './partials/fullMonthName.js';


export default function Participate({ items, selected, setMonth, mobile, open, setMobileMonth }) {
  const months = Object.keys(items);

  const selectors = months.map((month) => {
    const activeState = selected === month ? ' is-active' : '';

    return (
      <button
        key={month}
        className={`Participate-button${activeState}`}
        onClick={() => setMonth(month)}
      >
        {month}
      </button>
    );
  });

  const mobileItems = months.reduce(
    (result, month) => {
      return {
        ...result,
        [month]: month,
      };
    },
    {},
  );

  const mobileSelectors = (
    <PseudoSelect
      items={mobileItems}
      selected={selected}
      changeAction={month => setMobileMonth(month)}
      name="participate-select"
      open={open}
    />
  );

  const CallToActions = items[selected].buttons ? Object.keys(items[selected].buttons) : [];
  const CallToActionsButtons = CallToActions.map((key) => {
    return (
      <a
        href={items[selected].buttons[key]}
        className="Button is-inline u-marginRight u-marginRight--10 u-marginBottom u-marginBottom--10"
        key={key}
      >
        {key}
      </a>
    );
  });

  return (
    <div className="Participate">
      { mobile ? mobileSelectors : selectors }
      <div className="Participate-info" key={selected}>
        <h3 className="Page-subHeading">What is happening in {fullMonthName(selected)} with the department?</h3>
        <p>{items[selected].state}</p>
        <h3 className="Page-subHeading">How can I participate?</h3>
        <p>{items[selected].participate}</p>
        {CallToActionsButtons}
      </div>
    </div>
  );
}
