import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { ContactInfo, SalesInvoices } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Contact, SalesInvoice } from "../../services/sage/types";

type Props = {
  contact: Maybe<Contact>,
  salesInvoices: Array<SalesInvoice>,
  newSalesInvoiceLink: Maybe<string>,
  onNavigateToSalesInvoices: () => void,
};

const Home: FC<Props> = ({
  contact,
  salesInvoices,
  newSalesInvoiceLink,
  onNavigateToSalesInvoices,
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
    </>
  );
};

export { Home };
