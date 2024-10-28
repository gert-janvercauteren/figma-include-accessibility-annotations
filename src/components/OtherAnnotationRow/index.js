import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';
import { utils } from '../../constants';

function OtherAnnotationRow(props) {
  const { annotation } = props;

  return (
    <div className="other-annotation-row">
      <div>TYPE box</div>

      <div>Custom content {annotation.id}</div>

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
    id: PropTypes.string.isRequired
  }
};

export default React.memo(OtherAnnotationRow);
