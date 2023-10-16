import { useCallback } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useContact,
  useSetTitle,
  useSalesInvoices,
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
  const {
    newSalesInvoiceLink,
    newPurchaseInvoiceLink,
    isLoading: isLoadingLink,
  } = useSageExternalLink(contactId);
  const isLoading = [
    isLoadingId,
    isLoadingLink,
    isLoadingContact,
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
      contact={contact}
      salesInvoices={salesInvoices}
      purchaseInvoices={purchaseInvoices}
      newSalesInvoiceLink={newSalesInvoiceLink}
      newPurchaseInvoiceLink={newPurchaseInvoiceLink}
      onNavigateToSalesInvoices={onNavigateToSalesInvoices}
      onNavigateToPurchaseInvoices={onNavigateToPurchaseInvoices}
    />
  );
};

export { HomePage };
