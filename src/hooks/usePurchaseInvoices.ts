import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getPurchaseInvoicesService } from "../services/sage";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Contact, PurchaseInvoice } from "../services/sage/types";

type UsePurchaseInvoices = (contactId: Maybe<Contact["id"]>) => {
  isLoading: boolean,
  purchaseInvoices: Array<PurchaseInvoice>,
};

const usePurchaseInvoices: UsePurchaseInvoices = (contactId) => {
  const purchaseInvoices = useQueryWithClient(
    [QueryKey.PURCHASE_INVOICES, contactId as Contact["id"]],
    (client) => getPurchaseInvoicesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: purchaseInvoices.isLoading,
    purchaseInvoices: get(purchaseInvoices, ["data", "$items"], []) || [],
  };
};

export { usePurchaseInvoices };
