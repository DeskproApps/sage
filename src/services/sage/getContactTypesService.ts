import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { ContactType, Pagination } from "./types";

const getContactTypesService = (client: IDeskproClient) => {
  return baseRequest<Pagination<ContactType>>(client, {
    url: "/contact_types",
  });
};

export { getContactTypesService };
