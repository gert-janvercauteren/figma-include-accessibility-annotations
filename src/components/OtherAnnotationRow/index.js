import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';
import { utils } from '../../constants';
import annotationTypesAll from '../../data/other-annotation-types';
import Context from '../../context';

function OtherAnnotationRow(props) {
  // main app state
  const { zoomTo } = React.useContext(Context);

  const { annotation, warnClass = '' } = props;
  const annotationTypes = annotationTypesAll;

  return (
    <div className="other-annotation-row">
      <div>
        <button
          type="button"
          className="annotation-type-button"
          onClick={() => zoomTo([annotation.id], true)}
        >
          {annotationTypes[annotation.type].icon}
        </button>
      </div>

      <div className="other-annotation-content">
        <div className="label">{annotationTypes[annotation.type].label}:</div>
        <input
          className={`input${warnClass}`}
          type="text"
          // onChange={onChange}
          // onFocus={onFocus}
          placeholder="Type here"
          // value={altText}
        />
      </div>

      <div
        aria-label="remove other annotation"
        className="btn-remove"
        onClick={() => {
          /* TODO */
        }}
        onKeyDown={(e) => {
          if (utils.isEnterKey(e.key)) {
            /* Todo */
          }
        }}
        role="button"
        tabIndex="0"
      >
        <div className="remove-dash" />
      </div>
    </div>
  );
}

OtherAnnotationRow.propTypes = {
  annotation: {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  },
  warnClass: PropTypes.string
};

export default React.memo(OtherAnnotationRow);
