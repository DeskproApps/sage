import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { InvoiceLines } from "../InvoiceLines";
import { TotalPrice, Info } from "./blocks";
import type { FC } from "react";
import type { SalesEstimate } from "../../services/sage/types";

type Props = {
  currency: string,
  estimate: SalesEstimate,
};

const ViewSalesEstimate: FC<Props> = ({ estimate, currency }) => {
  return (
    <>
      <Container>
        <InvoiceLines
          currency={currency}
          invoiceLines={get(estimate, ["estimate_lines"], [] )}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <TotalPrice estimate={estimate} currency={currency}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Info estimate={estimate}/>
      </Container>
    </>
  );
};

export { ViewSalesEstimate };
