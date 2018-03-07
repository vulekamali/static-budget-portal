import { h, Component, render } from 'preact';
import ChartDownload from './../index.jsx';


function basicScript() {
  class ChartDownloadBasicTest extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selected: '1',
        open: false,
      };

      this.changeAction = this.changeAction.bind(this);
      this.canvas = null;
    }

    changeAction(value) {
      if (this.state.open) {
        this.setState({ selected: value });
        return this.setState({ open: false });
      }

      return this.setState({ open: true });
    }

    render() {
      return (
        <ChartDownload
          items={{ 'Test 1': '1', 'Test 2': '2', 'Test 3': '3' }}
          selected={this.state.selected}
          changeAction={this.changeAction}
          name="example"
          open={this.state.open}
          canvasAction={(node) => { this.canvas = node; }}
          clickAction={() => console.log(this.canvas)}
        />
      );
    }
  }


  const node = document.getElementById('basic-chartdownload-07-03');
  render(
    <ChartDownloadBasicTest />,
    node,
  );
}


export default basicScript();
