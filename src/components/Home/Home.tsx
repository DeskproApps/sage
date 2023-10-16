import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { ContactInfo, SalesInvoices, PurchaseInvoices } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Contact, SalesInvoice, PurchaseInvoice } from "../../services/sage/types";

type Props = {
  contact: Maybe<Contact>,
  salesInvoices: Array<SalesInvoice>,
  newSalesInvoiceLink: Maybe<string>,
  onNavigateToSalesInvoices: () => void,
  purchaseInvoices: Array<PurchaseInvoice>,
};

const Home: FC<Props> = ({
  contact,
  salesInvoices,
  newSalesInvoiceLink,
  onNavigateToSalesInvoices,
  purchaseInvoices,
}) => {
  return (
    <>
      <Container>
        <ContactInfo contact={contact} />
      </Container>

      <HorizontalDivider />

      <Container>
        <SalesInvoices
          salesInvoices={salesInvoices}
          newSalesInvoiceLink={newSalesInvoiceLink}
          onNavigateToSalesInvoices={onNavigateToSalesInvoices}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <PurchaseInvoices purchaseInvoices={purchaseInvoices} />
      </Container>

      <HorizontalDivider />
    </>
  );
};

export { Home };
