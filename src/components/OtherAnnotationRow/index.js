import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';
import { utils } from '../../constants';
import annotationTypesAll from '../../data/other-annotation-types';
import Context from '../../context';
import Dropdown from '../Dropdown';

function OtherAnnotationRow(props) {
  // main app state
  const { zoomTo } = React.useContext(Context);

  const { annotation, warnClass = '' } = props;
  const { id, type } = annotation;

  const annotationTypes = annotationTypesAll;
  const { fields } = annotationTypes[type];

  // on functions
  const { onRemove } = props;

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
        {fields.map((field) => {
          const test = 'hjddd';
          return (
            <div className="field-wrapper">
              <label className="label" htmlFor={`${id}-${field.id}`}>
                {field.label}:
              </label>

              {/* Text input type */}
              {field.type && field.type === 'text' && (
                <input
                  className={`input${warnClass}`}
                  type="text"
                  id={`${id}-${field.id}`}
                  // onChange={onChange}
                  // onFocus={onFocus}
                  placeholder="Type here"
                  // value={altText}
                />
              )}

              {/*  Select input  */}
              {field.type && field.type === 'select' && (
                <Dropdown
                  data={[{ id: 'test', value: 'More eh!' }]}
                  index={id}
                  isOpened={false}
                  onOpen={() => {}}
                  onSelect={() => {}}
                  type={"Oh no!"}
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        aria-label="remove other annotation"
        className="btn-remove"
        onClick={onRemove}
        onKeyDown={(e) => {
          if (utils.isEnterKey(e.key)) onRemove();
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
  annotation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  warnClass: PropTypes.string,
  onRemove: PropTypes.func.isRequired
};

export default React.memo(OtherAnnotationRow);
