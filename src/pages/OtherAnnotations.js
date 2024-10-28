import * as React from 'react';
import { AnnotationStepPage, HeadingStep } from '../components';
import Context from '../context';

import annotationTypesAll from '../data/other-annotation-types';
import { utils } from '../constants';

function OtherAnnotations() {
  const cnxt = React.useContext(Context);
  const { otherAnnotationsTemp, page, pageType } = cnxt;
  const { sendToFigma } = cnxt;

  // local state
  const [selectedNodes, setSelectedNodes] = React.useState(null);

  // ui state
  const routeName = 'Other annotations';
  const annotationTypes = annotationTypesAll;
  const annotationTypesArray = Object.keys(annotationTypes);
  const hasSelectedNodes = selectedNodes && selectedNodes.length > 0;

  const selectedText = () => {
    if (selectedNodes.length === 1) {
      return selectedNodes[0].name;
    }

    return `${selectedNodes.length} layers`;
  };

  const stepOneText = hasSelectedNodes
    ? `${selectedText()} selected`
    : 'Hold Ctrl/Cmd to select layer in your mock that needs annotating, and choose type of annotation.';

  React.useEffect(() => {
    sendToFigma('other-annotations-listener', {
      page,
      pageType,
      shouldListen: true
    });

    return () => {
      sendToFigma('other-annotations-listener', {
        page,
        pageType,
        shouldListen: false
      });
    };
  }, []);

  React.useEffect(() => {
    setSelectedNodes(otherAnnotationsTemp);
  }, [otherAnnotationsTemp]);

  const onInitialTypeSelect = (annotationType) => {
    if (!hasSelectedNodes) {
      // TODO WARNING
      return;
    }

    const newAnnotations = selectedNodes.map((node) => ({
      ...node,
      type: annotationType
    }));

    sendToFigma('add-other-annotations', {
      page,
      pageType,
      annotations: newAnnotations
    });
  };

  return (
    <AnnotationStepPage
      title="Other annotations"
      routeName={routeName}
      bannerTipProps={{ pageType, routeName }}
    >
      <React.Fragment>
        <HeadingStep number={1} text={stepOneText} />

        <div className="button-group" role="radiogroup">
          {annotationTypesArray.map((type) => {
            const { label, icon } = annotationTypes[type];

            const onClick = () => {
              onInitialTypeSelect(type);
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
