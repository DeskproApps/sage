import get from "lodash/get";
import { Price } from "../../common";
import type { FC } from "react";
import type { PurchaseInvoice } from "../../../services/sage/types";

export type Props = {
  currency: string,
  invoice: PurchaseInvoice,
};

const TotalPrice: FC<Props> = ({ currency, invoice }) => {
  return (
    <>
      <Price
        label="Total Net"
        currency={currency}
        price={(get(invoice, ["net_amount"]))}
      />
      <Price
        label="VAT"
        description={`(${
          invoice.tax_analysis
            .map(({ tax_rate }) => tax_rate?.displayed_as)
            .join(", ")
        })`}
        currency={currency}
        price={get(invoice, ["tax_amount"])}
      />
      <Price
        label="Total"
        currency={currency}
        price={get(invoice, ["total_amount"])}
      />
    </>
  );
};

export { TotalPrice };
