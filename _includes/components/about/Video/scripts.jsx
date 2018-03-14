import { h, Component, render } from 'preact';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';
import Video from './index.jsx';


class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: {
        language: this.props.jsonData[Object.keys(this.props.jsonData)[0]],
        select: false,
      },
    };

    this.setLanguage = this.setLanguage.bind(this);
  }


  setLanguage(language) {
    if (this.state.open.select === true) {
      this.setState({
        open: {
          ...this.state.open,
          language,
          select: false,
        },
      });
    } else {
      this.setState({
        open: {
          ...this.state.open,
          select: true,
        },
      });
    }
  }

  render() {
    return (
      <Video
        open={this.state.open}
        setLanguage={this.setLanguage}
        languageOptions={this.props.jsonData}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initVideo');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const component = nodes[i];
      const jsonData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-json')));
      render(<VideoContainer {...{ jsonData }} />, component);
    }
  }
}


export default scripts();
