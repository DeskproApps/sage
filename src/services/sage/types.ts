import type { Maybe, DateTime } from "../../types";

export type { paths, definitions, operations, external } from "./schema";

export type Response<T> = Promise<T>;

export type Pagination<T> = {
  $page: number,
  $total: number,
  $itemsPerPage: number,
  $back: Maybe<string>,
  $next: Maybe<string>, // "/contacts?page=2&items_per_page=5",
  $items: T[],
}

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
