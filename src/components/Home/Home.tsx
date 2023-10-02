import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { ContactInfo, SalesInvoices } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { definitions } from "../../services/sage/types";

type Props = {
  contact: Maybe<definitions["Contact"]>,
  salesInvoices: Array<definitions["SalesInvoice"]>,
};

const Home: FC<Props> = ({
  contact,
  salesInvoices,
}) => {
  return (
    <>
      <Container>
        <ContactInfo contact={contact} />
      </Container>

      <HorizontalDivider />

      <Container>
        <SalesInvoices salesInvoices={salesInvoices} />
      </Container>

      <HorizontalDivider />
    </>
  );
};

export { Home };
