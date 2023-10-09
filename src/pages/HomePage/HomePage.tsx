import { useCallback } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle, useContact, useSalesInvoices } from "../../hooks";
import { useContactId } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { contactId, isLoading: isLoadingId  } = useContactId();
  const { contact, isLoading: isLoadingContact } = useContact(contactId);
  const { salesInvoices, isLoading: isLoadingSalesInvoices } = useSalesInvoices(contactId);
  const isLoading = [
    isLoadingId,
    isLoadingContact,
    isLoadingSalesInvoices,
  ].some(Boolean);

  const onNavigateToSalesInvoices = useCallback(() => {
    navigate({
      pathname: "/sales-invoices",
      search: `?${createSearchParams({
        ...(!contactId ? {} : { contactId }),
      })}`,
    });
  }, [navigate, contactId]);

  useSetTitle("Sage");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
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
      onNavigateToSalesInvoices={onNavigateToSalesInvoices}
    />
  );
};

export { HomePage };
