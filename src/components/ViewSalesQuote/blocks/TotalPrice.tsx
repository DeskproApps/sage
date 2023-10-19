import get from "lodash/get";
import { Price } from "../../common";
import type { FC } from "react";
import type { SalesQuote } from "../../../services/sage/types";

export type Props = {
  currency: string,
  quote: SalesQuote,
};

const TotalPrice: FC<Props> = ({ currency, quote }) => {
  return (
    <>
      <Price
        label="Total Net"
        currency={currency}
        price={(get(quote, ["net_amount"]))}
      />
      <Price
        label="VAT"
        currency={currency}
        price={get(quote, ["tax_amount"])}
        description={`(${
          quote.tax_analysis
            .map(({ tax_rate }) => tax_rate?.displayed_as)
            .join(", ")
        })`}
      />
      <Price
        label="Total"
        currency={currency}
        price={get(quote, ["total_amount"])}
      />
    </>
  );
};

export { TotalPrice };
