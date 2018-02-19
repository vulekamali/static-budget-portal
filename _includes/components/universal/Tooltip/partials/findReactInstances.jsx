import { h, render } from 'preact';
import Tooltip from './../index.jsx';


export default function findReactInstances() {
  const patternId = document.getElementById('pattern-id-4368');
  if (patternId) {
    const component = (
      <Tooltip
        title="Content Unavailable"
        description="There is no exact match for this department in"
        year="2017-18"
        openAction={() => console.log('open')}
        closeAction={() => console.log('close')}
        down
        actions={[
          {
            url: 'asdsad',
            title: 'asdasd',
          },
          {
            url: 'asdsad',
            title: 'asdasd',
          },
          {
            url: 'asdsad',
            title: 'asdasd',
          },
        ]}
      >
        <div>asdasdasdsdsadasd</div>
      </Tooltip>
    );

    render(component, patternId);
  }
}
