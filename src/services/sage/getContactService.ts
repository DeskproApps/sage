import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { definitions } from "./types";

const getContactService = (
  client: IDeskproClient,
  contactId: Required<definitions["Contact"]>["id"],
) => {
  return baseRequest<definitions["Contact"]>(client, {
    url: `/contacts/${contactId}`,
    queryParams: {
      attributes: "all",
      nested_attributes: "all",
    },
  });
};

export { getContactService };
