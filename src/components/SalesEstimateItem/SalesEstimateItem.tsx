import { useMemo } from "react";
import get from "lodash/get";
import parse from "date-fns/parse";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { API_DATE_FORMAT } from "../../constants";
import { getSageLink } from "../../utils";
import { SageLogo, RouterLink } from "../common";
import type { FC } from "react";
import type { SalesEstimate } from "../../services/sage/types";

export type Props = {
  isLast: boolean,
  estimate: SalesEstimate,
};

const SalesEstimateItem: FC<Props> = ({ estimate, isLast }) => {
  const link = useMemo(() => getSageLink(get(estimate, ["links"])), [estimate]);

  return (
    <>
      <Title
        title={(
          <RouterLink to={`/sales-estimates/${estimate.id}`}>
            {get(estimate, ["displayed_as"], "-")}
          </RouterLink>
        )}
        marginBottom={7}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />

      <TwoProperties
        leftLabel="Reference"
        leftText={get(estimate, ["contact_reference"], "-")}
        rightLabel="Status"
        rightText={get(estimate, ["status", "displayed_as"], "-")}
      />

      <TwoProperties
        leftLabel="Created Date"
        leftText={format(parse(get(estimate, ["date"]), API_DATE_FORMAT, new Date()))}
        rightLabel="Expires"
        rightText={format(parse(get(estimate, ["expiry_date"]), API_DATE_FORMAT, new Date()))}
      />

      {!isLast && (
        <HorizontalDivider style={{ marginBottom: "10px" }}/>
      )}
    </>
  );
};

export { SalesEstimateItem };
