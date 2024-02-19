import { SingleLineTextTemplate } from './svgTemplates/singleLineText';
import { DoubleLineTextTemplate } from './svgTemplates/doubleLineText';
// import { PrototypeTemplate } from './svgTemplates/prototype';
// import { TestPixelsTemplate } from './svgTemplates/testPixels';
import { ISvgToGrayscaleTemplate } from './svgTemplates/ISvgToGrayscaleTemplate';
import { TripleLineTextTemplate } from './svgTemplates/tripleLineText';
import { EmbeddedImageTemplate } from './svgTemplates/embeddedImage';
// import { SingleLineSvgFontExperimentTemplate } from './svgTemplates/singleLineSvgFontExperimentTemplate';


export const SvgToGrayscaleTemplates = [
  DoubleLineTextTemplate,
  SingleLineTextTemplate,
  // SingleLineSvgFontExperimentTemplate,
  TripleLineTextTemplate,
  EmbeddedImageTemplate,
  // PrototypeTemplate,
  // TestPixelsTemplate,
] as ISvgToGrayscaleTemplate[];
