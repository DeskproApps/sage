import { useMemo } from "react";
import get from "lodash/get";
import parse from "date-fns/parse";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { API_DATE_FORMAT } from "../../constants";
import { getSageLink } from "../../utils";
import { SageLogo, RouterLink } from "../common";
import type { FC } from "react";
import type { SalesQuote } from "../../services/sage/types";

export type Props = {
  isLast: boolean,
  quote: SalesQuote,
};

const SalesQuoteItem: FC<Props> = ({ quote, isLast }) => {
  const link = useMemo(() => getSageLink(get(quote, ["links"])), [quote]);

  return (
    <>
      <Title
        title={(
          <RouterLink to={`/sales-quotes/${quote.id}`}>
            {get(quote, ["displayed_as"], "-")}
          </RouterLink>
        )}
        marginBottom={7}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />

      <TwoProperties
        leftLabel="Reference"
        leftText={get(quote, ["contact_reference"], "-")}
        rightLabel="Status"
        rightText={get(quote, ["status", "displayed_as"], "-")}
      />

      <TwoProperties
        leftLabel="Created Date"
        leftText={format(parse(get(quote, ["date"]), API_DATE_FORMAT, new Date()))}
        rightLabel="Expires"
        rightText={format(parse(get(quote, ["expiry_date"]), API_DATE_FORMAT, new Date()))}
      />

      {!isLast && (
        <HorizontalDivider style={{ marginBottom: "10px" }}/>
      )}
    </>
  );
};

export { SalesQuoteItem };
