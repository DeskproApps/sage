import size from "lodash/size";
import { isLast } from "../../utils";
import { NoFound } from "../common";
import { InvoiceLineItem } from "./InvoiceLineItem";
import type { FC } from "react";
import type { SalesInvoice, PurchaseInvoice } from "../../services/sage/types";

export type Props = {
  currency: string,
  invoiceLines: SalesInvoice["invoice_lines"]|PurchaseInvoice["invoice_lines"],
  skipDiscount?: boolean,
};

const InvoiceLines: FC<Props> = ({ invoiceLines, currency, skipDiscount }) => {
  if (!Array.isArray(invoiceLines) || !size(invoiceLines)) {
    return (
      <NoFound />
    );
  }

  return (
    <>
      {invoiceLines.map((invoiceLineItem, idx) => (
        <InvoiceLineItem
          key={invoiceLineItem.id}
          currency={currency}
          skipDiscount={skipDiscount}
          isLast={isLast(invoiceLines, idx)}
          invoiceItem={invoiceLineItem}
        />
      ))}
    </>
  );
};

export { InvoiceLines };
