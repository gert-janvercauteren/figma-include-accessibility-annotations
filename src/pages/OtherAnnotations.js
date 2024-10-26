import * as React from 'react';
import { AnnotationStepPage, HeadingStep } from '../components';
import Context from '../context';

import annotationTypesAll from '../data/other-annotation-types';
import { utils } from '../constants';

function OtherAnnotations() {
  const cnxt = React.useContext(Context);
  const { pageType } = cnxt;

  // ui state
  const routeName = 'Other annotations';
  const annotationTypes = annotationTypesAll;
  const annotationTypesArray = Object.keys(annotationTypes);

  return (
    <AnnotationStepPage
      title="Other annotations"
      routeName={routeName}
      bannerTipProps={{ pageType, routeName }}
    >
      <React.Fragment>
        <HeadingStep
          number={1}
          text="Hold Ctrl/Cmd to select layer in your mock that needs annotating, and choose type of annotation."
        />

        <div className="button-group" role="radiogroup">
          {annotationTypesArray.map((type) => {
            const { label, icon } = annotationTypes[type];

            const onClick = () => {
              // onInitialTypeSelect(type); TODO
            };

            return (
              <div key={label} className="container-selection-button">
                <div
                  className="selection-button"
                  onClick={onClick}
                  onKeyDown={(e) => {
                    if (utils.isEnterKey(e.key)) onClick();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div>{icon}</div>
                </div>

                <div className="selection-button-label">{label}</div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    </AnnotationStepPage>
  );
}

export default OtherAnnotations;
