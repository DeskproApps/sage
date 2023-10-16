import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, SalesInvoice, Pagination } from "./types";

const getSalesInvoicesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Pagination<SalesInvoice>>(client, {
    url: `/sales_invoices`,
    queryParams: {
      contact_id: contactId,
      attributes: "all",
    },
  });
};

export { getSalesInvoicesService };
