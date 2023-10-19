import get from "lodash/get";
import parse from "date-fns/parse";
import { Property } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { API_DATE_FORMAT } from "../../../constants";
import type { FC } from "react";
import type { SalesQuote } from "../../../services/sage/types";

export type Props = {
  quote: SalesQuote
};

const Info: FC<Props> = ({ quote }) => {
  return (
    <>
      <Property
        label="To"
        text={get(quote, ["contact_name"], "-") || "-"}
      />
      <Property
        label="Reference"
        text={get(quote, ["contact_reference"], "-") || "-"}
      />
      <Property
        label="Status"
        text={get(quote, ["status", "displayed_as"], "-") || "-"}
      />
      <Property
        label="Created Date"
        text={format(parse(quote.date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Expires"
        text={format(parse(quote.expiry_date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Terms & Conditions"
        text={get(quote, ["terms_and_conditions"], "-") || "-"}
      />
      <Property
        label="Notes"
        text={get(quote, ["notes"], "-") || "-"}
      />
    </>
  );
};

export { Info };
