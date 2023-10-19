import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSalesQuotesService } from "../services/sage";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Contact, SalesQuote } from "../services/sage/types";

type UseSalesQuotes = (contactId?: Maybe<Contact["id"]>) => {
  isLoading: boolean,
  quotes: Array<SalesQuote>,
};

const useSalesQuotes: UseSalesQuotes = (contactId) => {
  const quotes = useQueryWithClient(
    [QueryKey.SALES_QUOTES, contactId as Contact["id"]],
    (client) => getSalesQuotesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: quotes.isLoading,
    quotes: get(quotes, ["data", "$items"], []) || [],
  };
};

export { useSalesQuotes };
