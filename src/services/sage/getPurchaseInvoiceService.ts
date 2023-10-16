import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { PurchaseInvoice } from "./types";

const getPurchaseInvoiceService = (
  client: IDeskproClient,
  purchaseInvoiceId: PurchaseInvoice["id"],
) => {
  return baseRequest<PurchaseInvoice>(client, {
    url: `/purchase_invoices/${purchaseInvoiceId}`,
    queryParams: {
      attributes: "all",
      nested_attributes: "all",
    },
  });
};

export { getPurchaseInvoiceService };
