import type { DateTime } from "../../types";

export type Response<T> = Promise<T>;

export type ErrorType = {
  $severity: "error",
  $source: string,
  $dataCode: string,
  $message: string,
};

export type SageAPIError = ErrorType|ErrorType[];

export type AccessToken = {
  token_type: "bearer"
  access_token: string,
  refresh_token: string,
  expires_in: number,
  refresh_token_expires_in: number,
  requested_by_id: string,
  scope: "full_access"
};

export type User = {
  id: string,
  first_name: string,
  last_name: string,
  initials: string,
  displayed_as: string,
  email: string,
  locale: string,
  created_at: DateTime,
  updated_at: DateTime,
};

export type Contact = {
  //..
};
