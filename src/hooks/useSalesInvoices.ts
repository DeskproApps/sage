import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSalesInvoicesService } from "../services/sage";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Contact, SalesInvoice } from "../services/sage/types";

type UseSalesInvoices = (contactId: Maybe<Contact["id"]>) => {
  isLoading: boolean,
  salesInvoices: Array<SalesInvoice>,
};

const useSalesInvoices: UseSalesInvoices = (contactId) => {
  const salesInvoices = useQueryWithClient(
    [QueryKey.SALES_INVOICES, contactId as Contact["id"]],
    (client) => getSalesInvoicesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [salesInvoices].some(({ isLoading }) => isLoading),
    salesInvoices: get(salesInvoices, ["data", "$items"], []) || [],
  };
};

export { useSalesInvoices };
