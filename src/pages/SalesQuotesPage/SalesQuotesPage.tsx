import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useSalesQuotes,
  useSageExternalLink,
  useRegisterElements,
} from "../../hooks";
import { SalesQuotes } from "../../components";
import type { FC } from "react";

const SalesQuotesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { quotes, isLoading: isLoadingQuote } = useSalesQuotes(contactId);
  const { newSalesQuoteLink, isLoading: isLoadingLink } = useSageExternalLink(contactId);
  const isLoading = [isLoadingQuote, isLoadingLink].some(Boolean);

  useSetTitle("Sales Quotes");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <SalesQuotes
      quotes={quotes}
      newSalesQuoteLink={newSalesQuoteLink}
    />
  );
};

export { SalesQuotesPage };
