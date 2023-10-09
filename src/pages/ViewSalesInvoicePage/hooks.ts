import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSalesInvoiceService } from "../../services/sage";
import { QueryKey } from "../../query";
import type { SalesInvoice } from "../../services/sage/types";

type UseSalesInvoice = (salesInvoiceId?: SalesInvoice["id"]) => {
  isLoading: boolean,
  salesInvoice: SalesInvoice,
};

const useSalesInvoice: UseSalesInvoice = (salesInvoiceId) => {
  const salesInvoice = useQueryWithClient(
    [QueryKey.SALES_INVOICE, salesInvoiceId as SalesInvoice["id"]],
    (client) => getSalesInvoiceService(client, salesInvoiceId as SalesInvoice["id"]),
    { enabled: Boolean(salesInvoiceId), }
  );

  return {
    isLoading: [salesInvoice].some(({ isLoading }) => isLoading),
    salesInvoice: salesInvoice.data as SalesInvoice,
  };
};

export { useSalesInvoice };
