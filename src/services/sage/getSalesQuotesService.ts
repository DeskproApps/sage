import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, SalesQuote, Pagination } from "./types";

const getSalesQuotesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Pagination<SalesQuote>>(client, {
    url: "/sales_quotes",
    queryParams: {
      contact_id: contactId,
      attributes: "all",
    },
  });
};

export { getSalesQuotesService };
