import get from "lodash/get";
import size from "lodash/size";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { isLast } from "../../../utils";
import { NoFound } from "../../common";
import type { FC } from "react";
import type { definitions } from "../../../services/sage/schema";

export type Props = {
  salesInvoices: Array<definitions["SalesInvoice"]>;
};

export type SalesInvoiceItemProps = {
  invoice: definitions["SalesInvoice"],
  isLast: boolean,
};

const SalesInvoiceItem: FC<SalesInvoiceItemProps> = ({ invoice, isLast }) => (
  <>
    <Title
      title={get(invoice, ["displayed_as"], "-")}
      marginBottom={7}
    />

    <TwoProperties
      leftLabel="Reference"
      leftText={get(invoice, ["contact_reference"], "-")}
      rightLabel="Status"
      rightText={get(invoice, ["status", "displayed_as"], "-")}
    />

    <TwoProperties
      leftLabel="Invoice Date"
      leftText={format(get(invoice, ["created_at"]))}
      rightLabel="Due Date"
      rightText={format(get(invoice, ["due_date"]))}
    />

    {!isLast && (
      <HorizontalDivider style={{ marginBottom: "10px" }}/>
    )}
  </>
);

const SalesInvoices: FC<Props> = ({ salesInvoices }) => {
  return (
    <>
      <Title title={`Sales Invoices (${size(salesInvoices)})`} />

      {!Array.isArray(salesInvoices) || !size(salesInvoices)
        ? <NoFound text="No Sales Invoices found"/>
        : salesInvoices.map((invoice, idx) => (
          <SalesInvoiceItem
            key={invoice.id}
            invoice={invoice}
            isLast={isLast(salesInvoices, idx)}
          />
        ))
      }
    </>
  );
};

export { SalesInvoiceItem, SalesInvoices };
