import get from "lodash/get";
import parse from "date-fns/parse";
import { Property } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { API_DATE_FORMAT } from "../../../constants";
import type { FC } from "react";
import type { SalesEstimate } from "../../../services/sage/types";

export type Props = {
  estimate: SalesEstimate,
};

const Info: FC<Props> = ({ estimate }) => {
  return (
    <>
      <Property
        label="To"
        text={get(estimate, ["contact_name"], "-") || "-"}
      />
      <Property
        label="Reference"
        text={get(estimate, ["contact_reference"], "-") || "-"}
      />
      <Property
        label="Status"
        text={get(estimate, ["status", "displayed_as"], "-") || "-"}
      />
      <Property
        label="Created Date"
        text={format(parse(estimate.date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Expires"
        text={format(parse(estimate.expiry_date, API_DATE_FORMAT, new Date()))}
      />
      <Property
        label="Terms & Conditions"
        text={get(estimate, ["terms_and_conditions"], "-") || "-"}
      />
      <Property
        label="Notes"
        text={get(estimate, ["notes"], "-") || "-"}
      />
    </>
  );
};

export { Info };
