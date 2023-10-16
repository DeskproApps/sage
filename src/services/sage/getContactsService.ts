import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { Pagination, Contact } from "./types";

type Params = Dict<string> & {
  email?: string,
  search?: string,
};

const getContactsService = (
  client: IDeskproClient,
  params?: Params,
) => {
  const { email, search, ...queryParams } = params || {};

  return baseRequest<Pagination<Contact>>(client, {
    url: "/contacts",
    queryParams: {
      items_per_page: "200",
      attributes: "all",
      ...(!email ? {} : { email }),
      ...(!search ? {} : { search }),
      ...queryParams,
    },
  });
};

export { getContactsService };
