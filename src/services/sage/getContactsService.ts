import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Contact } from "./types";

type Options = {
  email?: string,
  search?: string,
};

const getContactsService = (
  client: IDeskproClient,
  options?: Options,
) => {
  return baseRequest<Pagination<Contact>>(client, {
    url: "/contacts",
    queryParams: {
      items_per_page: "200",
      ...(!options?.email ? {} : { email: options.email }),
      ...(!options?.search ? {} : { search: options.search }),
      attributes: "all",
    },
  });
};

export { getContactsService };
