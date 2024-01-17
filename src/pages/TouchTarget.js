import * as React from 'react';
import { utils } from '../constants';

// components
import {
  Alert,
  AnnotationStepPage,
  EmptyStepSelection,
  HeadingStep
} from '../components';

// icons
import { SvgWarning } from '../icons';

// icons: touch target
import SvgTouchTarget from '../icons/touch-target';

// app state
import Context from '../context';

// data
import touchTargetsTypes from '../data/touch-target-types';

const customFooter = (
  <React.Fragment>
    <div className="spacer2" />

    <div className="flex-row justify-center">
      <SvgTouchTarget.SvgHelp1 />
      <div className="spacer1w" />
      <SvgTouchTarget.SvgHelp2 />
    </div>

    <div className="flex-row justify-center">
      <div className="reading-order-text font-10">
        ex. touch targets for icons don&apos;t overlap
      </div>
      <div className="spacer1w" />
      <div className="reading-order-text font-10">
        ex. touch target for a group of elements
      </div>
    </div>
  </React.Fragment>
);

function TouchTarget() {
  // main app state
  const cnxt = React.useContext(Context);
  const { page, pageType, removeNodes, stepsCompleted, sendToFigma } = cnxt;
  const { touchTargets, updateState, zoomTo } = cnxt;

  // ui state
  const targetsArray = Object.keys(touchTargets);
  const targetTypesArray = Object.keys(touchTargetsTypes);
  const targetsAreSet = targetsArray.length !== 0;

  // state defaults
  const routeName = 'Touch target';
  const isCompleted = stepsCompleted.includes(routeName);
  const defaultNoTargets = isCompleted && targetsArray.length === 0;

  // local state
  const [checkedOverlap, setCheckedOverlap] = React.useState(false);
  const [overlaps, setOverlaps] = React.useState([]);
  const [noTargets, setNoTargets] = React.useState(defaultNoTargets);

  const onEmptySelected = () => {
    setNoTargets(!noTargets);
  };

  const onAddTouchTarget = (targetType) => {
    const { bounds, id } = page;

    // re-start checker
    setCheckedOverlap(false);

    // scroll to bottom of main
    utils.scrollToBottomOfAnnotationStep();

    sendToFigma('add-touch-target', {
      bounds,
      page,
      pageId: id,
      targetType,
      pageType
    });
  };

  const onRemoveTouchTarget = (idToRemove) => {
    // remove from main state
    const newTouchTargetsObj = { ...touchTargets };
    delete newTouchTargetsObj[idToRemove];

    // update main state
    updateState('touchTargets', newTouchTargetsObj);

    // remove node on Figma Document (array of IDs)
    removeNodes([idToRemove]);

    // check if already completed step
    const indexFound = stepsCompleted.indexOf(routeName);
    if (indexFound >= 0) {
      const newStepsCompleted = [...stepsCompleted];
      newStepsCompleted.splice(indexFound, 1);

      // update main state
      updateState('stepsCompleted', newStepsCompleted);
    }
  };

  const checkForOverlap = () => {
    // check for overlapping or min size of touch target
    sendToFigma('check-touch-targets', {
      page,
      pageId: page.id,
      pageType,
      touchTargets
    });
  };

  const confirmTouchTargetCheck = () => {
    // let figma side know the state of this step
    sendToFigma('add-checkmark-layer', {
      layerName: 'Touch target Layer',
      create: true,
      page,
      pageType
    });
  };

  const onMessageListen = async (event) => {
    const { data, type } = event.data.pluginMessage;

    // only listen for this response type on this step
    if (type === 'touch-targets-checked') {
      const { overlapsFound } = data;

      setOverlaps(overlapsFound);

      // no issues found
      if (overlapsFound.length === 0) {
        setCheckedOverlap(true);
      }
    }
  };

  React.useEffect(() => {
    // mount
    window.addEventListener('message', onMessageListen);

    return () => {
      // unmount
      window.removeEventListener('message', onMessageListen);
    };
  }, []);

  const checkText = overlaps.length > 0 ? 'Re-check' : 'Check';

  return (
    <AnnotationStepPage
      title="Touch target checks"
      bannerTipProps={{ pageType, routeName, footer: customFooter }}
      routeName={routeName}
      footerProps={{
        primaryAction:
          checkedOverlap === false && targetsAreSet
            ? {
                completesStep: false,
                onClick: checkForOverlap,
                buttonText: `${checkText} touch targets`
              }
            : {
                completesStep: true,
                onClick: confirmTouchTargetCheck,
                buttonText: 'Save and continue'
              },
        secondaryAction: null
      }}
    >
      <React.Fragment>
        <HeadingStep
          number={1}
          text="Check if there are any small elements that need to have the touch target marked up (e.g. an icon without background)."
        />

        <HeadingStep
          number={2}
          text="Add any additional annotation for elements to be regarded as one area (e.g. an image + CTA tile)."
        />

        {!targetsAreSet && (
          <EmptyStepSelection
            id="all-touch-targets-clear"
            isSelected={noTargets}
            onClick={onEmptySelected}
            text="All touch areas are clearly visible from the component shapes"
          />
        )}

        {overlaps.length > 0 && (
          <React.Fragment>
            <Alert
              icon={<SvgWarning />}
              style={{ padding: 0 }}
              text="Some of your touch targets are overlapping or not meeting minimum size."
              type="warning"
            />

            <div className="spacer1" />

            <HeadingStep number={3} text="Fix the issues" />

            {targetsArray.map((key) => {
              const { id, type } = touchTargets[key];
              const { label: labelType } = touchTargetsTypes[type];

              // only show issues
              if (overlaps.includes(key) === false) {
                return null;
              }

              const onClick = () => zoomTo([key], true);

              return (
                <div key={key} className="row-line-item flex-row-space-between">
                  <div
                    className="flex-row-center cursor-pointer"
                    onClick={onClick}
                    onKeyDown={(e) => {
                      if (utils.isEnterKey(e.key)) onClick();
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <SvgTouchTarget.SvgOverlap />
                    <div className="touch-target-type">{`Touch target (${labelType})`}</div>
                  </div>

                  <div
                    aria-label="remove touch target"
                    className="btn-remove"
                    onClick={() => onRemoveTouchTarget(id)}
                    onKeyDown={(e) => {
                      if (utils.isEnterKey(e.key)) onRemoveTouchTarget(id);
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="remove-dash" />
                  </div>
                </div>
              );
            })}

            <div className="spacer1" />

            <div className="divider" />
          </React.Fragment>
        )}

        {noTargets === false && (
          <React.Fragment>
            <div className="spacer2" />

            <div className="button-group" role="radiogroup">
              {targetTypesArray.map((type) => {
                const { label, icon } = touchTargetsTypes[type];

                const onClick = () => {
                  onAddTouchTarget(type);
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
        )}
      </React.Fragment>
    </AnnotationStepPage>
  );
}

export default TouchTarget;
