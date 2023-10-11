import type { Maybe, DateTime } from "../../types";
import type { definitions } from "./schema";

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

export type AuthErrorType = {
  error: string,
  error_description: string,
};

export type SageAPIError = AuthErrorType|ErrorType|ErrorType[];

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

export type ContactType = Required<definitions["Base"]>;

export type Contact = Required<definitions["Contact"]>;

export type ContactPerson = Required<definitions["ContactPerson"]>;

export type ContactPersonType = Required<definitions["ContactPersonType"]>;

export type Address = Required<definitions["Address"]> & {
  country: Required<definitions["Address"]["country"]>,
};

export type Country = Required<definitions["Base"]>;

export type SalesInvoiceLineItem = Required<definitions["SalesInvoiceLineItem"]>;

export type SalesInvoice = Omit<Required<definitions["SalesInvoice"]>, "invoice_lines"> & {
  invoice_lines?: SalesInvoiceLineItem[],
};
