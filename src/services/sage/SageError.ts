import { DEFAULT_ERROR } from "../../constants";
import type { SageAPIError } from "./types";

export type InitData = {
  status: number,
  data: SageAPIError,
};

class SageError extends Error {
  status: number;
  data: SageAPIError;

  constructor({ status, data }: InitData) {
    super(DEFAULT_ERROR);

    this.data = data;
    this.status = status;
  }
}

export { SageError };
