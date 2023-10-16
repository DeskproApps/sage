import { useCallback} from "react";
import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { nbsp } from "../../../constants";
import { NoFound, Link, LinkIcon } from "../../common";
import { SalesInvoiceItem } from "../../SalesInvoiceItem";
import type { FC, MouseEvent } from "react";
import type { Maybe } from "../../../types";
import type { SalesInvoice } from "../../../services/sage/types";

export type Props = {
  salesInvoices: Array<SalesInvoice>,
  newSalesInvoiceLink?: Maybe<string>,
  onNavigateToSalesInvoices?: () => void,
};

const SalesInvoices: FC<Props> = ({
  salesInvoices,
  newSalesInvoiceLink,
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
          <>
            <Link href="#" onClick={onClick}>
              Sales Invoices
              {nbsp}
              ({size(salesInvoices)})
            </Link>
            {nbsp}
            {newSalesInvoiceLink && (
              <LinkIcon href={newSalesInvoiceLink} icon={faPlus} />
            )}
          </>
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
