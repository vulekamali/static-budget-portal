import React, { Component } from 'react';
import Markup from './Markup';

class SectionHeading extends Component {
  constructor(props) {
    super(props);
    const { years, phases } = this.props;

    this.state = {
      selectedYear: years && years.selected,
      selectedPhase: phases && phases.selected,
    };
    this.events = {
      changeYearHandler: this.changeYearHandler.bind(this),
      changePhaseHandler: this.changePhaseHandler.bind(this),
    };
  }

  componentDidUpdate({ selectedYear: prevSelectedYear, selectedPhase: prevSelectedPhase }) {
    const {
      state: { selectedYear: newSelectedYear, selectedPhase: newSelectedPhase },
      props: { years, phases },
    } = this;

    if (years && years.onChange && newSelectedYear !== prevSelectedYear) {
      years.onChange(newSelectedYear);
    }
    if (phases && phases.onChange && newSelectedPhase !== prevSelectedPhase) {
      years.onChange(newSelectedPhase);
    }
  }

  changeYearHandler(selectedYear) {
    this.setState({ selectedYear });
  }

  changePhaseHandler(selectedPhase) {
    this.setState({ selectedPhase });
  }

  render() {
    const {
      state: { selectedYear, selectedPhase },
      events: { changeYearHandler, changePhaseHandler },
      props: { years, phases },
    } = this;

    const passedProps = {
      ...this.props,
      years: years && {
        selected: selectedYear,
        options: years.options,
        onChange: changeYearHandler,
        loading: years.loading,
      },
      phases: phases && {
        selected: selectedPhase,
        options: phases.options,
        onChange: changePhaseHandler,
        loading: phases.loading,
      },
    };

    return <Markup {...passedProps} />;
  }
}

export default SectionHeading;
