import size from "lodash/size";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { NoFound } from "../../common";
import { PurchaseInvoiceItem } from "../../PurchaseInvoiceItem";
import type { FC } from "react";
import type { PurchaseInvoice } from "../../../services/sage/types";

export type Props = {
  purchaseInvoices: Array<PurchaseInvoice>,
};

const PurchaseInvoices: FC<Props> = ({
  purchaseInvoices,
}) => {
  return (
    <>
      <Title
        title={`PurchaseInvoices (${size(purchaseInvoices)})`}
      />
      {!Array.isArray(purchaseInvoices) || !size(purchaseInvoices)
        ? <NoFound text="No Purchase Invoices found"/>
        : purchaseInvoices.map((invoice, idx) => (
          <PurchaseInvoiceItem
            key={invoice.id}
            invoice={invoice}
            isLast={isLast(purchaseInvoices, idx)}
          />
        ))
      }
    </>
  );
};

export { PurchaseInvoices };
