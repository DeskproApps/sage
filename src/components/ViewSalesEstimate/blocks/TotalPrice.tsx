import get from "lodash/get";
import { Price } from "../../common";
import type { FC } from "react";
import type { SalesEstimate } from "../../../services/sage/types";

export type Props = {
  currency: string,
  estimate: SalesEstimate,
};

const TotalPrice: FC<Props> = ({ currency, estimate }) => {
  return (
    <>
      <Price
        label="Total Net"
        currency={currency}
        price={(get(estimate, ["net_amount"]))}
      />
      <Price
        label="VAT"
        currency={currency}
        price={get(estimate, ["tax_amount"])}
        description={`(${
          estimate.tax_analysis
            .map(({ tax_rate }) => tax_rate?.displayed_as)
            .join(", ")
        })`}
      />
      <Price
        label="Total"
        currency={currency}
        price={get(estimate, ["total_amount"])}
      />
    </>
  );
};

export { TotalPrice };
