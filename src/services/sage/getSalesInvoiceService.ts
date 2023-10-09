import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { SalesInvoice } from "./types";

const getSalesInvoiceService = (
  client: IDeskproClient,
  salesInvoiceId: SalesInvoice["id"],
) => {
  return baseRequest(client, {
    url: `/sales_invoices/${salesInvoiceId}`,
  });
};

export { getSalesInvoiceService };
