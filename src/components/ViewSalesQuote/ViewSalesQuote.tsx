import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { InvoiceLines } from "../InvoiceLines";
import { TotalPrice, Info } from "./blocks";
import type { FC } from "react";
import type { SalesQuote } from "../../services/sage/types";

type Props = {
  currency: string,
  quote: SalesQuote,
};

const ViewSalesQuote: FC<Props> = ({ quote, currency }) => {
  return (
    <>
      <Container>
        <InvoiceLines
          currency={currency}
          invoiceLines={get(quote, ["quote_lines"], [] )}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <TotalPrice quote={quote} currency={currency}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Info quote={quote}/>
      </Container>
    </>
  );
};

export { ViewSalesQuote };
