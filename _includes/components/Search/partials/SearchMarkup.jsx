import { h } from 'preact';
import PropTypes from 'prop-types';
import FormArea from './FormArea.jsx';
import ResultsArea from './ResultsArea.jsx';


export default function SearchMarkup(props) {
  const {
    count,
    currentKeywords,
    error,
    findSuggestions,
    focus,
    itemsArray,
    loading,
    searching,
    selectedYear,
    setFocus,
  } = props;

  if (loading) {
    return (
      <div className="Search-wrap">
        <div className="Search-form is-loading" />
      </div>
    );
  }

  return (
    <div className="Search-function">
      <div className={`Search-wrap${focus ? ' is-focused' : ''}`}>
        <FormArea
          {...{
            currentKeywords,
            findSuggestions,
            selectedYear,
            setFocus,
          }}
        />

        <ResultsArea
          {...{
            count,
            currentKeywords,
            error,
            focus,
            itemsArray,
            searching,
            selectedYear,
          }}
        />
      </div>
    </div>
  );
}

SearchMarkup.propTypes = {
  count: PropTypes.string.isRequired,
  currentKeywords: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  findSuggestions: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,

  itemsArray: PropTypes.arrayOf(
    PropTypes.shape({
      sphere: PropTypes.arrayOf(PropTypes.string),
      financial_year: PropTypes.arrayOf(PropTypes.string),
      extras: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    }),
  ),

  loading: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
  selectedYear: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
};

SearchMarkup.defaultProps = {
  itemsArray: [],
};
