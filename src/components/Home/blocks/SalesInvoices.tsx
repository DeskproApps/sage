import { useCallback} from "react";
import size from "lodash/size";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { nbsp } from "../../../constants";
import { NoFound, Link } from "../../common";
import { SalesInvoiceItem } from "../../SalesInvoiceItem";
import type { FC, MouseEvent } from "react";
import type { SalesInvoice } from "../../../services/sage/types";

export type Props = {
  salesInvoices: Array<SalesInvoice>,
  onNavigateToSalesInvoices?: () => void,
};

const SalesInvoices: FC<Props> = ({
  salesInvoices,
  onNavigateToSalesInvoices,
}) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToSalesInvoices && onNavigateToSalesInvoices()
  }, [onNavigateToSalesInvoices]);

  return (
    <>
      <Title
        title={(
          <Link href="#" onClick={onClick}>
            Sales Invoices
            {nbsp}
            ({size(salesInvoices)})
          </Link>
        )}
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
    </>
  );
};

export { SalesInvoices };
