import size from "lodash/size";
import { NoFound } from "../../common";
import type { FC } from "react";
import type { SalesInvoice } from "../../../services/sage/types";

type Props = {
  invoiceLines: SalesInvoice["invoice_lines"],
};

const InvoiceLines: FC<Props> = ({ invoiceLines }) => {
  if (!Array.isArray(invoiceLines) || !size(invoiceLines)) {
    return (
      <NoFound text="No invoice line items found"/>
    );
  }

  return (
    <>InvoiceLines</>
  );
};

export { InvoiceLines };
