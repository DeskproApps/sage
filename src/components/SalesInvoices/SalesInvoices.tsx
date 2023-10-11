import size from "lodash/size";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../utils";
import { Container, NoFound } from "../common";
import { SalesInvoiceItem } from "../SalesInvoiceItem";
import type { FC } from "react";
import type { SalesInvoice } from "../../services/sage/types";

export type Props = {
  salesInvoices: Array<SalesInvoice>;
};

const SalesInvoices: FC<Props> = ({ salesInvoices }) => {
  return (
    <Container>
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
    </Container>
  );
};

export { SalesInvoices };
