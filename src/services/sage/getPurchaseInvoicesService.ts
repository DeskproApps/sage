import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, PurchaseInvoice, Pagination } from "./types";

const getPurchaseInvoicesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Pagination<PurchaseInvoice>>(client, {
    url: `/purchase_invoices`,
    queryParams: {
      contact_id: contactId,
      attributes: "all",
    },
  });
};

export { getPurchaseInvoicesService };
