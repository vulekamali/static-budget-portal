import { h, Component, render } from 'preact';
import Radios from './../index.jsx';


function basicScript() {
  class TestContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selected: '2',
      };

      this.changeAction = this.changeAction.bind(this);
    }

    changeAction(value) {
      this.setState({ selected: value });
    }

    render() {
      return <Radios items={{ 'Test 1': '1', 'Test 2': '2', 'Test 3': '3' }} selected={this.state.selected} changeAction={this.changeAction} name="example" />;
    }
  }


  const node = document.getElementById('radios-basic-example-07-03');
  render(
    <TestContainer />,
    node,
  );
}


export default basicScript();
