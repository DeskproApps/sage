import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { InvoiceLines, Price, Info } from "./block";
import type { FC } from "react";
import type { SalesInvoice } from "../../services/sage/types";

type Props = {
  currency: string,
  salesInvoice: SalesInvoice
};

const ViewSalesInvoice: FC<Props> = ({
  currency,
  salesInvoice,
}) => {

  return (
    <>
      <Container>
        <InvoiceLines
          currency={currency}
          invoiceLines={get(salesInvoice, ["invoice_lines"], [])}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Price currency={currency} invoice={salesInvoice}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Info invoice={salesInvoice}/>
      </Container>
    </>
  );
};

export { ViewSalesInvoice };
