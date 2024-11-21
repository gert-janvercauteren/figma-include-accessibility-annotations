import {
  createAnnotationFrame,
  createAnnotationFrameTitleText,
  createAnnotationInfoFrame,
  createAnnotationLabelValueRow,
  createAnnotationNumberFrame,
  createInnerAnnotationFrame,
  getOrCreateMainA11yFrame,
  getOrCreateMainAnnotationsFrame
} from '../frame-helpers';
import { colors, figmaLayer, utils } from '../../constants';

import annotationTypesAll from '../../data/other-annotation-types';

const otherAnnotationsLayerName = 'Other annotations Layer';

// Create the items inside a single item
const createOtherAnnotationInfoFrame = ({ type, valueDict }) => {
  const otherAnnotationInfoFrame = createAnnotationInfoFrame({
    name: 'Other annotation info'
  });

  Object.keys(valueDict).forEach((key) => {
    otherAnnotationInfoFrame.appendChild(
      createAnnotationLabelValueRow({
        rowName: key,
        label: `${key}:`,
        value: valueDict[key]
      })
    );
  });

  return otherAnnotationInfoFrame;
};

// Create a single entry for the sidebar
const createOtherAnnotation = ({ number, id, type, valueDict }) => {
  // Create other annotation with horizontal auto layout
  const otherAnnotationBlock = createInnerAnnotationFrame({
    annotationBlockName: 'Other annotation',
    number,
    id
  });

  // Add the annotation number
  otherAnnotationBlock.appendChild(
    createAnnotationNumberFrame({
      number,
      fillColor: colors.otherPurple
    })
  );

  // Add the annotation info
  otherAnnotationBlock.appendChild(
    createOtherAnnotationInfoFrame({ type, valueDict })
  );

  return otherAnnotationBlock;
};

const createOtherAnnotationAnnotationFrame = ({ name }) => {
  // create an annotation frame
  const frame = createAnnotationFrame({ name });

  // and add the Annotation frame title
  const annotationTitle = createAnnotationFrameTitleText({
    title: name
  });
  frame.appendChild(annotationTitle);
  return frame;
};

const createOtherAnnotationFrameInFigma = ({
  pageX,
  pageY,
  otherAnnotationBounds,
  otherAnnotationsFrame,
  otherAnnotationTitle,
  otherAnnotationType,
  id,
  index = 0
}) => {
  const contextX = otherAnnotationBounds.x - pageX;
  const contextY = otherAnnotationBounds.y - pageY;

  const { otherPurple, white } = colors;

  // Create frame for annotation
  const annotationBlock = figmaLayer.createTransparentFrame({
    name: `Other annotation: ${otherAnnotationType} | ${otherAnnotationTitle.trim()} | ${id.trim()}`,
    x: contextX,
    y: contextY,
    height: otherAnnotationBounds.height,
    width: otherAnnotationBounds.width
  });

  // Create rectangle
  const rectNode = figmaLayer.createRectangle({
    name: `Other annotation area ${otherAnnotationType}`,
    height: otherAnnotationBounds.height,
    width: otherAnnotationBounds.width,
    fillColor: otherPurple,
    strokeColor: otherPurple
  });

  rectNode.dashPattern = [0.01, 6];
  rectNode.strokeCap = 'ROUND';
  rectNode.strokeAlign = 'CENTER';

  // Add rectangle to layer
  annotationBlock.appendChild(rectNode);

  // Create label background with auto-layout
  const labelFrame = figmaLayer.createFrame({
    name: 'Label Background',
    height: 1,
    width: 1,
    x: -8,
    y: -8,
    fillColor: otherPurple,
    opacity: 1
  });

  labelFrame.layoutMode = 'HORIZONTAL';
  labelFrame.horizontalPadding = 8;
  labelFrame.verticalPadding = 5;
  labelFrame.counterAxisSizingMode = 'AUTO';
  labelFrame.strokes = [{ type: 'SOLID', color: white }];
  labelFrame.strokeWeight = 2;

  // do NOT have it scale with the surrounding frame
  labelFrame.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN'
  };

  // create annotation name for label
  const labelNode = figma.createText();
  labelNode.name = `Other annotation: ${otherAnnotationTitle}`;
  labelNode.fontSize = 15;
  labelNode.characters = `${index + 1} ${annotationTypesAll[otherAnnotationType].label}`;
  labelNode.fills = [{ type: 'SOLID', color: colors.white }];
  labelNode.fontName = { family: 'Roboto', style: 'Bold' };

  // add label node to frame
  labelFrame.appendChild(labelNode);

  // Add label to frame
  annotationBlock.appendChild(labelFrame);

  // Add annotation block to other annotations frame
  otherAnnotationsFrame.appendChild(annotationBlock);
};

export const addOtherAnnotations = (msg) => {
  figma.currentPage.selection = [];

  const { annotations, startIndex, page, pageType } = msg;
  const { bounds } = page;
  const { height: pageH, width: pageW } = bounds;

  // get main A11y frame if it exists (or create it)
  const mainFrame = getOrCreateMainA11yFrame({ page, pageType });

  const otherAnnotationsExists = utils.checkIfChildNameExists(
    mainFrame.id,
    otherAnnotationsLayerName
  );

  let otherAnnotationsFrame;

  if (!otherAnnotationsExists) {
    otherAnnotationsFrame = figmaLayer.createTransparentFrame({
      name: otherAnnotationsLayerName,
      height: pageH,
      width: pageW
    });

    otherAnnotationsFrame.name = `${otherAnnotationsLayerName} | ${otherAnnotationsFrame.id}`;
    mainFrame.appendChild(otherAnnotationsFrame);
  } else {
    otherAnnotationsFrame = figma.getNodeById(otherAnnotationsExists);
  }

  // Allow frame to be visible on top, but not interfere with selection
  otherAnnotationsFrame.locked = true;

  let index = startIndex;

  annotations.forEach((annotation) => {
    const { id, name, absoluteRenderBounds, type } = annotation;

    createOtherAnnotationFrameInFigma({
      pageX: bounds.x,
      pageY: bounds.y,
      otherAnnotationBounds: absoluteRenderBounds,
      otherAnnotationsFrame,
      otherAnnotationTitle: name,
      otherAnnotationType: type,
      id,
      index
    });

    index += 1;
  });
};

export const saveAnnotations = (msg) => {
  const { annotations, page, pageType } = msg;

  // get main A11y frame if it exists (or create it)
  const mainFrame = getOrCreateMainA11yFrame({ page, pageType });

  // Add to annotation sidebar
  // TODO: Cleanup old one
  const mainAnnotationsFrame = getOrCreateMainAnnotationsFrame({
    mainFrame,
    page
  });

  // Create annotation frame
  const annotationFrame = createOtherAnnotationAnnotationFrame({
    name: 'Other annotations'
  });

  // Create sub-type frame
  const subTypeFrame = createOtherAnnotationAnnotationFrame({
    name: 'Role'
  });

  annotationFrame.appendChild(subTypeFrame);

  let index = 0;
  annotations.forEach((annotation) => {
    const { id, type, name } = annotation;
    const valueDict = {
      Name: name,
      Role: 'Checkbox',
      State: 'Unchecked'
    };

    subTypeFrame.appendChild(
      createOtherAnnotation({
        number: index,
        id,
        type,
        valueDict
      })
    );

    index += 1;
  });

  // add Annotation layer to the main annotations frame
  mainAnnotationsFrame.insertChild(0, annotationFrame);
};

export default { addOtherAnnotations, saveAnnotations };
