import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import {
  ContactInfo,
  SalesQuotes,
  SalesInvoices,
  SalesEstimates,
  PurchaseInvoices,
} from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type {
  Contact,
  SalesQuote,
  SalesInvoice,
  SalesEstimate,
  PurchaseInvoice,
} from "../../services/sage/types";

type Props = {
  contact: Maybe<Contact>,
  salesInvoices: Array<SalesInvoice>,
  newSalesInvoiceLink: Maybe<string>,
  onNavigateToSalesInvoices: () => void,
  purchaseInvoices: Array<PurchaseInvoice>,
  newPurchaseInvoiceLink: Maybe<string>,
  onNavigateToPurchaseInvoices: () => void,
  quotes: Array<SalesQuote>,
  estimates: Array<SalesEstimate>,
  onNavigateToSalesQuotes: () => void,
  onNavigateToSalesEstimates: () => void,
  newSalesQuoteLink: Maybe<string>,
  newSalesEstimateLink: Maybe<string>,
};

const Home: FC<Props> = ({
  quotes,
  contact,
  estimates,
  salesInvoices,
  purchaseInvoices,
  newSalesQuoteLink,
  newSalesInvoiceLink,
  newSalesEstimateLink,
  newPurchaseInvoiceLink,
  onNavigateToSalesQuotes,
  onNavigateToSalesInvoices,
  onNavigateToSalesEstimates,
  onNavigateToPurchaseInvoices,
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
        <PurchaseInvoices
          purchaseInvoices={purchaseInvoices}
          newPurchaseInvoiceLink={newPurchaseInvoiceLink}
          onNavigateToPurchaseInvoices={onNavigateToPurchaseInvoices}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <SalesQuotes
          quotes={quotes}
          newSalesQuoteLink={newSalesQuoteLink}
          onNavigateToSalesQuotes={onNavigateToSalesQuotes}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <SalesEstimates
          estimates={estimates}
          newSalesEstimateLink={newSalesEstimateLink}
          onNavigateToSalesEstimates={onNavigateToSalesEstimates}
        />
      </Container>
    </>
  );
};

export { Home };
