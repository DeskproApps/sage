import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { isLast } from "../../utils";
import { Container, NoFound, LinkIcon } from "../common";
import { PurchaseInvoiceItem } from "../PurchaseInvoiceItem";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { PurchaseInvoice } from "../../services/sage/types";

export type Props = {
  newPurchaseInvoiceLink: Maybe<string>,
  purchaseInvoices: Array<PurchaseInvoice>,
};

const PurchaseInvoices: FC<Props> = ({
  purchaseInvoices,
  newPurchaseInvoiceLink,
}) => {
  return (
    <Container>
      <Title
        title={(
          <>
            Purchase Invoices ({size(purchaseInvoices)})
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
    </Container>
  );
};

export { PurchaseInvoices };
