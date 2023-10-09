import get from "lodash/get";
import { Title } from "@deskpro/app-sdk";
import { Container } from "../common";
import { InvoiceLines } from "./block";
import type { FC } from "react";
import type { SalesInvoice } from "../../services/sage/types";

type Props = {
  salesInvoice: SalesInvoice
};

const ViewSalesInvoice: FC<Props> = ({
  salesInvoice,
}) => {
  return (
    <Container>
      <Title title={get(salesInvoice, ["displayed_as"])} />

      <InvoiceLines invoiceLines={get(salesInvoice, ["invoice_lines"], [])}/>
    </Container>
  );
};

export { ViewSalesInvoice };
