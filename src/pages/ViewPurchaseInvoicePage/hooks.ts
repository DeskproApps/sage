import { useQueryWithClient } from "@deskpro/app-sdk";
import { getPurchaseInvoiceService } from "../../services/sage";
import { QueryKey } from "../../query";
import type { PurchaseInvoice } from "../../services/sage/types";

type UsePurchaseInvoice = (purchaseInvoiceId?: PurchaseInvoice["id"]) => {
  isLoading: boolean,
  purchaseInvoice: PurchaseInvoice,
};

const usePurchaseInvoice: UsePurchaseInvoice = (purchaseInvoiceId) => {
  const purchaseInvoice = useQueryWithClient(
    [QueryKey.PURCHASE_INVOICE, purchaseInvoiceId as PurchaseInvoice["id"]],
    (client) => getPurchaseInvoiceService(client, purchaseInvoiceId as PurchaseInvoice["id"]),
    { enabled: Boolean(purchaseInvoiceId) }
  );

  return {
    isLoading: purchaseInvoice.isLoading,
    purchaseInvoice: purchaseInvoice.data as PurchaseInvoice,
  };
};

export { usePurchaseInvoice };
