import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../utils";
import { Container, NoFound, LinkIcon } from "../common";
import { nbsp } from "../../constants";
import { SalesInvoiceItem } from "../SalesInvoiceItem";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { SalesInvoice } from "../../services/sage/types";

export type Props = {
  salesInvoices: Array<SalesInvoice>,
  newSalesInvoiceLink?: Maybe<string>,
};

const SalesInvoices: FC<Props> = ({ salesInvoices, newSalesInvoiceLink }) => {
  return (
    <Container>
      <Title
        title={
          <>
            Sales Invoices ({size(salesInvoices)})
            {nbsp}
            {newSalesInvoiceLink && (
              <LinkIcon icon={faPlus} href={newSalesInvoiceLink} />
            )}
          </>
        }
      />

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
