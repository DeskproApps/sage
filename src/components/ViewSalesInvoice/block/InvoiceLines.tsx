import size from "lodash/size";
import { isLast } from "../../../utils";
import { NoFound } from "../../common";
import { InvoiceLineItem } from "./InvoiceLineItem";
import type { FC } from "react";
import type { SalesInvoice } from "../../../services/sage/types";

export type Props = {
  currency: string,
  invoiceLines: SalesInvoice["invoice_lines"],
};

const InvoiceLines: FC<Props> = ({ invoiceLines, currency }) => {
  if (!Array.isArray(invoiceLines) || !size(invoiceLines)) {
    return (
      <NoFound text="No invoice line items found"/>
    );
  }

  return (
    <>
      {invoiceLines.map((invoiceLineItem, idx) => (
        <InvoiceLineItem
          key={invoiceLineItem.id}
          currency={currency}
          isLast={isLast(invoiceLines, idx)}
          invoiceItem={invoiceLineItem}
        />
      ))}
    </>
  );
};

export { InvoiceLines };
