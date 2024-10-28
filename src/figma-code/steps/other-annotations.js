import { getOrCreateMainA11yFrame } from '../frame-helpers';
import { colors, figmaLayer, utils } from '../../constants';

const otherAnnotationsLayerName = 'Other annotations Layer';

const getOtherAnnotationBlockName = ({
  otherAnnotationType,
  otherAnnotationTitle,
  id
}) =>
  `Other annotation: ${otherAnnotationType} | ${otherAnnotationTitle.trim()} | ${id.trim()}`;

const createOtherAnnotationFrameInFigma = ({
  pageType,
  pageX,
  pageY,
  otherAnnotationBounds,
  otherAnnotationsFrame,
  otherAnnotationTitle,
  otherAnnotationType,
  id
}) => {
  const contextX = otherAnnotationBounds.x - pageX;
  const contextY = otherAnnotationBounds.y - pageY;

  const { otherPurple, white } = colors;

  // create heading outline
  const otherAnnotationOutline = figmaLayer.createRectangle({
    name: 'Other annotation outline',
    x: contextX,
    y: contextY,
    height: otherAnnotationBounds.height,
    width: otherAnnotationBounds.width,
    strokeColor: otherPurple,
    radiusMixed: [{ topLeftRadius: 0 }],
    fillColor: otherPurple,
    opacity: 0.2
  });

  // start of group array
  const toGroupArray = [otherAnnotationOutline];

  // create annotation label
  const label = figmaLayer.createRectangle({
    name: 'Label Background',
    height: 29,
    width: pageType === 'web' ? 40 : 29,
    x: contextX - 8,
    y: contextY - 12,
    fillColor: otherPurple,
    stroke: 0,
    opacity: 1,
    radius: 0
  });
  toGroupArray.push(label);

  // create annotation name for label
  const numberNode = figma.createText();
  numberNode.fontSize = 18;

  numberNode.name = `Annotation Type: ${otherAnnotationType}`;
  numberNode.characters = `1 ${otherAnnotationType}`;

  numberNode.fills = [{ type: 'SOLID', color: white }];
  numberNode.fontName = { family: 'Roboto', style: 'Bold' };
  numberNode.x = contextX;
  numberNode.y = contextY - 8;
  toGroupArray.push(numberNode);

  const annotationsBlock = figma.group(toGroupArray, otherAnnotationsFrame);
  const blockName = getOtherAnnotationBlockName({
    id,
    otherAnnotationType,
    otherAnnotationTitle
  });

  annotationsBlock.name = blockName;
  annotationsBlock.resizeWithoutConstraints(
    otherAnnotationBounds.width,
    otherAnnotationBounds.height
  );
  otherAnnotationBounds.expanded = false;
};

export const addOtherAnnotations = (msg) => {
  figma.currentPage.selection = [];

  const { annotations, page, pageType } = msg;
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

  annotations.forEach((annotation) => {
    const { id, name, absoluteRenderBounds, type } = annotation;

    createOtherAnnotationFrameInFigma({
      pageType,
      pageX: 0,
      pageY: 0,
      otherAnnotationBounds: absoluteRenderBounds,
      otherAnnotationsFrame,
      otherAnnotationTitle: name,
      otherAnnotationType: type,
      id
    });
  });
};

export default { addOtherAnnotations };
