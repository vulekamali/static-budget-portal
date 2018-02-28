import { h, Component } from 'preact';
import Markup from './Markup.jsx';


export default class VideoContainer extends Component {
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
      <Markup
        open={this.state.open}
        setLanguage={this.setLanguage}
        languageOptions={this.props.jsonData}
      />
    );
  }
}
