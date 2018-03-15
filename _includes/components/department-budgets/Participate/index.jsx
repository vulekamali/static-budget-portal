import { h } from 'preact';


export default function Participate({ items, selected, setMonth }) {
  const months = Object.keys(items);

  const selectors = months.map((month) => {
    const activeState = selected === month ? ' is-active' : '';

    return (
      <button
        key={month}
        className={`Button is-lightGrey is-inline u-marginRight u-marginRight--10 u-marginBottom u-marginBottom--10${activeState}`}
        onClick={() => setMonth(month)}
      >
        {month}
      </button>
    );
  });

  const CallToActions = Object.keys(items[selected].buttons) || [];
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
      { selectors }
      <div className="Participate-info" key={selected}>
        <h3 className="Page-subHeading">What is happening in March with the department?</h3>
        <p>{items[selected].state}</p>
        <h3 className="Page-subHeading">How can I participate?</h3>
        <p>{items[selected].participate}</p>
        {CallToActionsButtons}
      </div>
    </div>
  );
}
