import { useSearchParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle, useSalesInvoices } from "../../hooks";
import { SalesInvoices } from "../../components";
import type { FC } from "react";

const SalesInvoicesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { salesInvoices, isLoading } = useSalesInvoices(contactId);

  useSetTitle("Sales Invoices");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
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
    />
  );
};

export { SalesInvoicesPage };
