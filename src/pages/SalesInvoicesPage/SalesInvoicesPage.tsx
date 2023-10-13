import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useSalesInvoices,
  useSageExternalLink,
  useRegisterElements,
} from "../../hooks";
import { SalesInvoices } from "../../components";
import type { FC } from "react";

const SalesInvoicesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { salesInvoices, isLoading: isLoadingInvoice } = useSalesInvoices(contactId);
  const { newSalesInvoiceLink, isLoading: isLoadingLink } = useSageExternalLink(contactId);
  const isLoading = [isLoadingInvoice, isLoadingLink].some(Boolean);

  useSetTitle("Sales Invoices");

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
    <SalesInvoices
      salesInvoices={salesInvoices}
      newSalesInvoiceLink={newSalesInvoiceLink}
    />
  );
};

export { SalesInvoicesPage };
