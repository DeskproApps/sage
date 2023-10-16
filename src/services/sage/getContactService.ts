import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

const getContactService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Contact>(client, {
    url: `/contacts/${contactId}`,
    queryParams: {
      attributes: "all",
      nested_attributes: "all",
    },
  });
};

export { getContactService };
