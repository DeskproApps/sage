import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { definitions, Pagination } from "./types";

const getSalesInvoicesService = (
  client: IDeskproClient,
  contactId: Required<definitions["Contact"]>["id"],
) => {
  return baseRequest<Pagination<definitions["SalesInvoice"]>>(client, {
    url: `/sales_invoices`,
    queryParams: {
      contact_id: contactId,
      attributes: "all",
    },
  });
};

export { getSalesInvoicesService };
