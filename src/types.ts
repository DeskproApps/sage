import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Response, Contact, ContactPerson } from "./services/sage/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** 2023-09-29 */
export type DateOn = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Dict<any>|RequestInit["body"],
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<T>;

/** Deskpro types */
export type Settings = {
  client_id?: string,
  add_comment_when_linking?: boolean,
  use_advanced_connect?: boolean,
};

export type UserData = {
  user: {
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    titlePrefix: string,
    isDisabled: boolean,
    isAgent: boolean,
    isConfirmed: boolean,
    emails: string[],
    primaryEmail: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customFields: Dict<any>,
    language: string,
    locale: string,
  },
};

export type UserContext = Context<UserData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type LogoutPayload = { type: "logout" };

export type UnlinkPayload = { type: "unlink" };

export type EventPayload =
  | NavigateToChangePage
  | LogoutPayload
  | UnlinkPayload
;

/** Entities */
export type EntityMetadata = {
  id: Contact["id"],
  contact: Contact["name"],
  contactType?: "Customer"|"Supplier"|string,
  personPrimary?: ContactPerson["name"],
  personEmail?: ContactPerson["email"],
};
