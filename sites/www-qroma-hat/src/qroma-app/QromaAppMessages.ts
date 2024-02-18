import { MathRequest } from "../qroma-proto/my-project-messages";
import { MathResponse } from "../qroma-proto/my-project-messages";
import { HelloQromaResponse, QromaHeartbeatUpdate } from "../qroma-proto/my-project-messages";
import { HelloQromaRequest } from "../qroma-proto/my-project-messages";


export const QromaAppMessages = [
  QromaHeartbeatUpdate,
  HelloQromaRequest,
  HelloQromaResponse,
  MathRequest,
  MathResponse,
];