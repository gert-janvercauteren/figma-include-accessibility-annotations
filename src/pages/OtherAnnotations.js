import * as React from "react";
import Context from "../context";

import annotationTypesAll from "../data/other-annotation-types";
import { utils } from "../constants";

// components
import {
  AnnotationStepPage,
  HeadingStep,
  OtherAnnotationRow
} from "../components";

function OtherAnnotations() {
  const cnxt = React.useContext(Context);
  const { otherAnnotations, otherAnnotationsTemp, page, pageType } = cnxt;
  const { sendToFigma, updateState } = cnxt;

  // local state
  const [selectedNodes, setSelectedNodes] = React.useState(null);

  // ui state
  const routeName = "Other annotations";
  const annotationTypes = annotationTypesAll;
  const annotationTypesArray = Object.keys(annotationTypes);
  const hasSelectedNodes = selectedNodes && selectedNodes.length > 0;
  const otherAnnotationsArray = Object.keys(otherAnnotations);
  const hasAnnotations = otherAnnotationsArray.length > 0;

  const selectedText = () => {
    if (selectedNodes.length === 1) {
      return selectedNodes[0].name;
    }

    return `${selectedNodes.length} layers`;
  };

  const stepOneText = hasSelectedNodes
    ? `${selectedText()} selected`
    : "Hold Ctrl/Cmd to select layer in your mock that needs annotating, and choose type of annotation.";

  React.useEffect(() => {
    sendToFigma("other-annotations-listener", {
      page,
      pageType,
      shouldListen: true
    });

    return () => {
      sendToFigma("other-annotations-listener", {
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

    sendToFigma("add-other-annotations", {
      page,
      pageType,
      annotations: newAnnotations,
      startIndex: otherAnnotationsArray.length
    });

    const otherAnnotationsObj = {};
    newAnnotations.forEach((item) => {
      otherAnnotationsObj[item.id] = item;
    });

    updateState("otherAnnotations", {
      ...otherAnnotations,
      ...otherAnnotationsObj
    });
  };

  return (
    <AnnotationStepPage
      title="Other annotations"
      routeName={routeName}
      bannerTipProps={{ pageType, routeName }}
    >
      <React.Fragment>
        {hasAnnotations && (
          <React.Fragment>
            <HeadingStep number={1} text="Add annotations" />
            {otherAnnotationsArray.map((key) => {
              const { id, type } = otherAnnotations[key];

              return <OtherAnnotationRow annotation={{ id, type }} key={id} />;
            })}
          </React.Fragment>
        )}

        <React.Fragment>
          <HeadingStep number={hasAnnotations ? 2 : 1} text={stepOneText} />

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
                    <div className="annotation-type-icon">{icon}</div>
                  </div>

                  <div className="selection-button-label">{label}</div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      </React.Fragment>
    </AnnotationStepPage>
  );
}

export default OtherAnnotations;
