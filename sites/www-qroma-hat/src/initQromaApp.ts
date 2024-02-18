import { QromaLightsConfig } from "./qroma-proto/qroma-lights-types"
import { registerQromaAppMessageTypes } from "./react-qroma-lib/qroma-lib/page-app/QromaPageInit";

console.log("INIT QROMA APP CLIENT MODULE")

registerQromaAppMessageTypes({
  QromaLightsConfig: QromaLightsConfig,
});