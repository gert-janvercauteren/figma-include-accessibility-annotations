import {
  createAnnotationFrame,
  createAnnotationFrameTitleText,
  createAnnotationInfoFrame,
  createAnnotationLabelValueRow,
  createAnnotationNumberFrame,
  createInnerAnnotationFrame,
  createSubAnnotationFrame,
  getOrCreateMainA11yFrame,
  getOrCreateMainAnnotationsFrame
} from '../frame-helpers';
import { colors, figmaLayer, utils } from '../../constants';

import annotationTypesAll from '../../data/other-annotation-types';

const otherAnnotationsLayerName = 'Other annotations Layer';

// Create the items inside a single item
const createOtherAnnotationInfoFrame = ({
  type,
  valueDict,
  showItemLabels
}) => {
  const otherAnnotationInfoFrame = createAnnotationInfoFrame({
    name: `Other annotation info | ${type}`
  });

  Object.keys(valueDict).forEach((key) => {
    otherAnnotationInfoFrame.appendChild(
      createAnnotationLabelValueRow({
        rowName: key,
        label: showItemLabels ? `${key}:` : '',
        value: valueDict[key]
      })
    );
  });

  return otherAnnotationInfoFrame;
};

// Create a single entry for the sidebar
const createOtherAnnotation = ({ number, type, valueDict, showItemLabels }) => {
  // Create other annotation with horizontal auto layout
  const otherAnnotationBlock = createInnerAnnotationFrame({
    annotationBlockName: 'Other annotation',
    number,
    id: '0'
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
    createOtherAnnotationInfoFrame({ type, valueDict, showItemLabels })
  );

  return otherAnnotationBlock;
};

const createOutlineFrame = ({
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

  return annotationBlock.id;
};

const addAnnotationToSidebar = ({
  type,
  index,
  values,
  showItemLabels,
  page,
  pageType
}) => {
  // get main A11y frame if it exists (or create it)
  const mainFrame = getOrCreateMainA11yFrame({ page, pageType });

  // Add to annotation sidebar
  const mainAnnotationsFrame = getOrCreateMainAnnotationsFrame({
    mainFrame,
    page
  });

  const annotationFrameName = 'Other annotations';

  const annotationFrameExists = utils.checkIfChildNameExists(
    mainAnnotationsFrame.id,
    annotationFrameName,
    false
  );

  let annotationFrame;

  if (annotationFrameExists) {
    annotationFrame = figma.getNodeById(annotationFrameExists);
  } else {
    // Create annotation frame
    annotationFrame = createAnnotationFrame({
      name: annotationFrameName
    });

    const annotationTitle = createAnnotationFrameTitleText({
      title: annotationFrameName
    });
    annotationFrame.appendChild(annotationTitle);

    // add Annotation layer to the main annotations frame
    mainAnnotationsFrame.insertChild(0, annotationFrame);
  }

  const subFrameName = type;
  const annotationSubFrameExists = utils.checkIfChildNameExists(
    annotationFrame.id,
    subFrameName,
    false
  );

  let subTypeFrame;

  if (annotationSubFrameExists) {
    subTypeFrame = figma.getNodeById(annotationSubFrameExists);
  } else {
    // Create sub-type frame
    subTypeFrame = createSubAnnotationFrame({
      name: subFrameName
    });

    const annotationTitle = createAnnotationFrameTitleText({
      title: subFrameName
    });
    subTypeFrame.appendChild(annotationTitle);

    annotationFrame.appendChild(subTypeFrame);
  }

  const row = createOtherAnnotation({
    number: index,
    type,
    valueDict: values,
    showItemLabels
  });

  subTypeFrame.appendChild(row);

  return row.id;
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

  // Get previous saved data
  const previousRawData = otherAnnotationsFrame.getPluginData('annotationData');
  let annotationsData;
  try {
    annotationsData = JSON.parse(previousRawData);
  } catch (e) {
    console.error('Could not parse previous annotation data');
  }

  if (typeof annotationsData !== 'object' || annotationsData === null) {
    annotationsData = {};
  }

  annotations.forEach((annotation) => {
    const { id, name, absoluteRenderBounds, type } = annotation;
    const annotationType = annotationTypesAll[type];

    const outlineId = createOutlineFrame({
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

    const values = {};
    annotationType.fields.forEach((field) => {
      values[field.label] = field.type === 'text' ? name : '';
    });

    const annotationId = addAnnotationToSidebar({
      type: annotationType.label,
      values,
      index,
      showItemLabels: annotationType.showAnnotationLabels,
      page,
      pageType
    });

    annotationsData[id] = {
      id,
      name,
      type,
      outlineId,
      annotationId,
      values
    };
  });

  console.log(annotationsData);

  otherAnnotationsFrame.setPluginData(
    'annotationData',
    JSON.stringify(annotationsData)
  );
};

export const removeOtherAnnotation = (msg) => {
  const { id, page, pageType } = msg;

  // get main A11y frame if it exists (or create it)
  const mainFrame = getOrCreateMainA11yFrame({ page, pageType });

  const otherAnnotationsFrameId = utils.checkIfChildNameExists(
    mainFrame.id,
    otherAnnotationsLayerName
  );

  if (otherAnnotationsFrameId) {
    const otherAnnotationsFrame = figma.getNodeById(otherAnnotationsFrameId);

    // Get previous saved data
    const previousRawData =
      otherAnnotationsFrame.getPluginData('annotationData');
    let annotationsData;
    try {
      annotationsData = JSON.parse(previousRawData);
    } catch (e) {
      console.error('Could not parse previous annotation data');
    }

    if (typeof annotationsData !== 'object' || annotationsData === null) {
      annotationsData = {};
    }

    const { outlineId, annotationId } = annotationsData[id];

    const outlineFrame = figma.getNodeById(outlineId);
    if (outlineFrame) {
      outlineFrame.remove();
    }

    const annotationFrame = figma.getNodeById(annotationId);

    if (annotationFrame) {
      annotationFrame.remove();
    }

    delete annotationsData[id];
    otherAnnotationsFrame.setPluginData(
      'annotationData',
      JSON.stringify(annotationsData)
    );
  }
};

export default { addOtherAnnotations, removeOtherAnnotation };
