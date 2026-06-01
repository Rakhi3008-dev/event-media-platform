import axios from "axios";
import {
  CompareFacesCommand
} from "@aws-sdk/client-rekognition";

import rekognition from "../config/rekognition.js";

export const compareFaces = async (
  sourceUrl,
  targetUrl
) => {
  try {
    const sourceImage = await axios.get(
      sourceUrl,
      {
        responseType: "arraybuffer",
      }
    );

    const targetImage = await axios.get(
      targetUrl,
      {
        responseType: "arraybuffer",
      }
    );

    const command =
      new CompareFacesCommand({
        SourceImage: {
          Bytes: Buffer.from(
            sourceImage.data
          ),
        },

        TargetImage: {
          Bytes: Buffer.from(
            targetImage.data
          ),
        },

        SimilarityThreshold: 80,
      });

    const result =
      await rekognition.send(command);

    return result.FaceMatches.length > 0;

  } catch (error) {
    console.error(error);
    return false;
  }
};