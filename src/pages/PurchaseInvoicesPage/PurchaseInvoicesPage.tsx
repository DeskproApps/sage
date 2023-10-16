import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  usePurchaseInvoices,
  useSageExternalLink,
  useRegisterElements,
} from "../../hooks";
import { PurchaseInvoices } from "../../components";
import type { FC } from "react";

const PurchaseInvoicesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { purchaseInvoices, isLoading: isLoadingInvoice } = usePurchaseInvoices(contactId);
  const { newPurchaseInvoiceLink, isLoading: isLoadingLink } = useSageExternalLink(contactId);
  const isLoading = [isLoadingInvoice, isLoadingLink].some(Boolean);

  useSetTitle("Purchase Invoices");

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
    <PurchaseInvoices
      purchaseInvoices={purchaseInvoices}
      newPurchaseInvoiceLink={newPurchaseInvoiceLink}
    />
  );
};

export { PurchaseInvoicesPage };
