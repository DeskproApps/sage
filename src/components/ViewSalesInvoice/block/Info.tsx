import get from "lodash/get";
import parse from "date-fns/parse";
import { Property } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { API_DATE_FORMAT } from "../../../constants";
import type { FC } from "react";
import type { SalesInvoice } from "../../../services/sage/types";

export type Props = {
  invoice: SalesInvoice,
};

const Info: FC<Props> = ({ invoice }) => {
  return (
    <>
      <Property
        label="To"
        text={get(invoice, ["contact_name"], "-") || "-"}
      />
      <Property
        label="Reference"
        text={get(invoice, ["contact_reference"], "contact_reference") || "-"}
      />
      <Property
        label="Invoice Status"
        text={get(invoice, ["status", "displayed_as"], "-") || "-"}
      />
      <Property
        label="Invoice Date"
        text={format(parse(invoice.date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Due Date"
        text={format(parse(invoice.due_date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Terms & Conditions"
        text={get(invoice, ["terms_and_conditions"], "-") || "-"}
      />
      <Property
        label="Notes"
        text={get(invoice, ["notes"], "-") || "-"}
      />
    </>
  );
};

export { Info };
