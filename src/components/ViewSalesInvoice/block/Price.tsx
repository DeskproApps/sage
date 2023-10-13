import get from "lodash/get";
import { P4, P5, Stack, TSpan } from "@deskpro/deskpro-ui";
import { formatPrice } from "../../../utils";
import { Secondary } from "../../common";
import type { FC } from "react";
import type { SalesInvoice } from "../../../services/sage/types";

export type Props = {
  currency: string,
  invoice: SalesInvoice,
};

const Price: FC<Props> = ({ invoice, currency }) => {
  return (
    <>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <P5>Total Net</P5>
        <P4>{formatPrice(get(invoice, ["net_amount"]), currency)}</P4>
      </Stack>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <P5>Discount</P5>
        <P4>{formatPrice(get(invoice, ["total_discount_amount"]), currency)}</P4>
      </Stack>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <div>
          <TSpan type="p5">VAT</TSpan>{" "}
          <Secondary type="p11">
            ({
              invoice.tax_analysis
                .map(({ tax_rate }) => tax_rate?.displayed_as)
                .join(", ")
            })
          </Secondary>
        </div>
        <P4>{formatPrice(get(invoice, ["tax_amount"]), currency)}</P4>
      </Stack>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <P5>Total</P5>
        <P4>{formatPrice(get(invoice, ["total_amount"]), currency)}</P4>
      </Stack>
    </>
  );
};

export { Price };
