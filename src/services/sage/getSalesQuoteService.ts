import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { SalesQuote } from "./types";

const getSalesQuoteService = (
  client: IDeskproClient,
  quoteId: SalesQuote["id"],
) => {
  return baseRequest<SalesQuote>(client, {
    url: `/sales_quotes/${quoteId}`,
    queryParams: {
      attributes: "all",
      nested_attributes: "all",
    },
  });
};

export { getSalesQuoteService };
