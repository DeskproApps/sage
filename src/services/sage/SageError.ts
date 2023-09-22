import type { SageAPIError } from "./types";

export type InitData = {
  status: number,
  data: SageAPIError,
};

class SageError extends Error {
  status: number;
  data: SageAPIError;

  constructor({ status, data }: InitData) {
    const message = "Sage Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { SageError };
