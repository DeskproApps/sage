import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { InvoiceLines } from "../InvoiceLines";
import { TotalPrice, Info } from "./blocks";
import type { FC } from "react";
import type { PurchaseInvoice } from "../../services/sage/types";

type Props = {
  currency: string,
  purchaseInvoice: PurchaseInvoice,
};

const ViewPurchaseInvoice: FC<Props> = ({ currency, purchaseInvoice }) => {
  return (
    <>
      <Container>
        <InvoiceLines
          skipDiscount
          currency={currency}
          invoiceLines={get(purchaseInvoice, ["invoice_lines"], [])}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <TotalPrice
          currency={currency}
          invoice={purchaseInvoice}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Info invoice={purchaseInvoice}/>
      </Container>
    </>
  );
};

export { ViewPurchaseInvoice };
