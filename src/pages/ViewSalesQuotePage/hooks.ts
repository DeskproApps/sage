import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSalesQuoteService } from "../../services/sage";
import { QueryKey } from "../../query";
import type { SalesQuote } from "../../services/sage/types";

type UseSalesQuote = (quoteId?: SalesQuote["id"]) => {
  isLoading: boolean,
  quote: SalesQuote,
};

const useSalesQuote: UseSalesQuote = (quoteId) => {
  const quote = useQueryWithClient(
    [QueryKey.SALES_QUOTES, quoteId as SalesQuote["id"]],
    (client) => getSalesQuoteService(client, quoteId as SalesQuote["id"]),
    { enabled: Boolean(quoteId) },
  );

  return {
    isLoading: quote.isLoading,
    quote: quote.data as SalesQuote,
  };
};

export { useSalesQuote };
