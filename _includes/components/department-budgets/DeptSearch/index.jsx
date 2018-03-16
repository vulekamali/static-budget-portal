import { h } from 'preact';
import DeptControl from './../DeptControl/index.jsx';
import DeptGroup from './../DeptGroup/index.jsx';


export default function DeptSearchMarkup({ state, eventHandlers, epresData }) {
  return (
    <div className="DeptSearch">
      <div className="DeptSearch-wrap">
        <h3 className="u-sReadOnly">Filters</h3>
        <ul className="DeptSearch-list">
          <li>
            <DeptControl
              open={state.open}

              keywords={state.filters.keywords}
              sphere={state.filters.sphere}
              province={state.filters.province}

              updateFilter={eventHandlers.updateDropdown}
              changeKeywords={eventHandlers.updateKeywords}
            />
          </li>
        </ul>
        <h3 className="u-sReadOnly">Results</h3>
        <div className="DeptSearch-results">
          {
            state.results.map(
              ({ name, slug, departments }) => {
                if (state.emptyGroups.indexOf(slug) > -1) {
                  return (
                    <div className="DeptSearch-groupWrap">
                      <DeptGroup
                        empty
                        map={slug}
                        name={name}
                        epre={epresData[slug] || null}
                      />
                    </div>
                  );
                } else if (departments.length > 0) {
                  return (
                    <div className="DeptSearch-groupWrap">
                      <DeptGroup
                        map={slug}
                        linksArray={departments}
                        name={name}
                        doubleRow={slug === 'south-africa'}
                      />
                    </div>
                  );
                }

                return null;
              },
            )
          }
        </div>
      </div>
    </div>
  );
}
