import { useCallback } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useContact,
  useSetTitle,
  useSalesQuotes,
  useSalesInvoices,
  useSalesEstimates,
  usePurchaseInvoices,
  useRegisterElements,
  useSageExternalLink,
} from "../../hooks";
import { useContactId } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { contactId, isLoading: isLoadingId  } = useContactId();
  const { contact, isLoading: isLoadingContact } = useContact(contactId);
  const { salesInvoices, isLoading: isLoadingSalesInvoices } = useSalesInvoices(contactId);
  const { purchaseInvoices, isLoading: isLoadingPurchaseInvoices } = usePurchaseInvoices(contactId);
  const { quotes, isLoading: isLoadingQuotes } = useSalesQuotes(contactId);
  const { estimates, isLoading: isLoadingEstimates } = useSalesEstimates(contactId);
  const {
    newSalesQuoteLink,
    newSalesInvoiceLink,
    newSalesEstimateLink,
    newPurchaseInvoiceLink,
    isLoading: isLoadingLink,
  } = useSageExternalLink(contactId);
  const isLoading = [
    isLoadingId,
    isLoadingLink,
    isLoadingContact,
    isLoadingQuotes,
    isLoadingEstimates,
    isLoadingSalesInvoices,
    isLoadingPurchaseInvoices,
  ].some(Boolean);

  const onNavigateToSalesInvoices = useCallback(() => {
    navigate({
      pathname: "/sales-invoices",
      search: `?${createSearchParams({
        ...(!contactId ? {} : { contactId }),
      })}`,
    });
  }, [navigate, contactId]);

  const onNavigateToPurchaseInvoices = useCallback(() => {
    navigate({
      pathname: "/purchase-invoices",
      search: `?${createSearchParams({
        ...(!contactId ? {} : { contactId }),
      })}`,
    });
  }, [navigate, contactId]);

  const onNavigateToSalesQuotes = useCallback(() => {
    navigate({
      pathname: "/sales-quotes",
      search: `?${createSearchParams({
        ...(!contactId ? {} : { contactId }),
      })}`,
    });
  }, [navigate, contactId]);

  const onNavigateToSalesEstimates = useCallback(() => {
    navigate({
      pathname: "/sales-estimates",
      search: `?${createSearchParams({
        ...(!contactId ? {} : { contactId }),
      })}`,
    });
  }, [navigate, contactId]);

  useSetTitle("Sage");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Unlink Contact", payload: { type: "unlink" }},
        { title: "Log Out", payload: { type: "logout" }},
      ],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      quotes={quotes}
      contact={contact}
      estimates={estimates}
      salesInvoices={salesInvoices}
      purchaseInvoices={purchaseInvoices}
      newSalesQuoteLink={newSalesQuoteLink}
      newSalesInvoiceLink={newSalesInvoiceLink}
      newSalesEstimateLink={newSalesEstimateLink}
      newPurchaseInvoiceLink={newPurchaseInvoiceLink}
      onNavigateToSalesQuotes={onNavigateToSalesQuotes}
      onNavigateToSalesInvoices={onNavigateToSalesInvoices}
      onNavigateToSalesEstimates={onNavigateToSalesEstimates}
      onNavigateToPurchaseInvoices={onNavigateToPurchaseInvoices}
    />
  );
};

export { HomePage };
