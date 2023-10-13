import get from "lodash/get";
import uniq from "lodash/uniq";
import { DEFAULT_ERROR } from "../constants";
import type { ErrorType } from "../services/sage/types";

export const generateErrorMessage = (err: ErrorType) => {
  const message = get(err, ["$message"], "");
  const source = get(err, ["$source"], "");

  if (source && message) {
    return `${source}: ${message}`;
  } else if (!source && message) {
    return message;
  } else {
    return DEFAULT_ERROR;
  }
};

const getErrors = (errors: ErrorType|ErrorType[]): string[] => {
  const result: string[] = [];

  if (!Array.isArray(errors)) {
    result.push(generateErrorMessage(errors));
  }

  if (Array.isArray(errors)) {
    errors.forEach((err) => {
      result.push(generateErrorMessage(err));
    });
  }

  return uniq(result);
};

export { getErrors };
