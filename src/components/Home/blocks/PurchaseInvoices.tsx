import { useCallback } from "react";
import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { nbsp } from "../../../constants";
import { isLast } from "../../../utils";
import { NoFound, Link, LinkIcon } from "../../common";
import { PurchaseInvoiceItem } from "../../PurchaseInvoiceItem";
import type { FC, MouseEvent } from "react";
import type { Maybe } from "../../../types";
import type { PurchaseInvoice } from "../../../services/sage/types";

export type Props = {
  newPurchaseInvoiceLink: Maybe<string>,
  purchaseInvoices: Array<PurchaseInvoice>,
  onNavigateToPurchaseInvoices: () => void,
};

const PurchaseInvoices: FC<Props> = ({
  purchaseInvoices,
  newPurchaseInvoiceLink,
  onNavigateToPurchaseInvoices,
}) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToPurchaseInvoices && onNavigateToPurchaseInvoices();
  }, [onNavigateToPurchaseInvoices]);

  return (
    <>
      <Title
        title={(
          <>
            <Link href="#" onClick={onClick}>
              Purchase Invoices ({size(purchaseInvoices)})
            </Link>
            {nbsp}
            {newPurchaseInvoiceLink && (
              <LinkIcon href={newPurchaseInvoiceLink} icon={faPlus} />
            )}
          </>
        )}
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
