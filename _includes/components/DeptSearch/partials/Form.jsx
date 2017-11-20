import { h } from 'preact';


export default function Form({ state, eventHandlers }) {
  // const items = [
  //   {
  //     title: 'All Provinces',
  //     value: null,
  //   },
  //   {
  //     title: 'Western Cape',
  //     value: 'westernCape',
  //   },
  //   {
  //     title: 'Eastern Cape',
  //     value: 'easternCape',
  //   },
  //   {
  //     title: 'Gauteng',
  //     value: 'gauteng',
  //   }
  // ]

  const updateResults = event => eventHandlers.filterResults(event.target.value);

  return (
    <div className="DeptSearch-form">
      <input
        value={state.keywords}
        className="DeptSearch-keywords"
        placeholder="Find a department"
        onInput={updateResults}
      />
      { /*
        <span className="DeptSearch-divider">in</span>
        <Select {...{ items, eventHandlers }} state={state.province} /> 
      */ }
    </div>
  );
}
