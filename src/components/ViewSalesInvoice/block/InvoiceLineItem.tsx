import { useMemo } from "react";
import get from "lodash/get";
import { P4, P5, Stack } from "@deskpro/deskpro-ui";
import { PropertyRow, Property, HorizontalDivider } from "@deskpro/app-sdk";
import { formatPrice } from "../../../utils";
import type { FC } from "react";
import type { SalesInvoiceLineItem } from "../../../services/sage/types";

export type Props = {
  invoiceItem: SalesInvoiceLineItem,
  isLast: boolean,
  currency: string,
};

const InvoiceLineItem: FC<Props> = ({ invoiceItem, isLast, currency }) => {
  const totalAmount = useMemo(() => {
    return formatPrice(get(invoiceItem, ["net_amount"], "0") || "0", currency || "GBR")
  }, [invoiceItem, currency]);

  return (
    <>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <P5>{get(invoiceItem, ["description"], "-")}</P5>
        <P4>{totalAmount}</P4>
      </Stack>
      <PropertyRow>
        <Property
          label="Qty"
          text={get(invoiceItem, ["quantity"], 1)}
          marginBottom={0}
        />
        <Property
          label="Price"
          text={get(invoiceItem, ["unit_price"], 0)}
          marginBottom={0}
        />
        <Property
          label="Discount"
          text={get(invoiceItem, ["discount_amount"], 0)}
          marginBottom={0}
        />
        <Property
          label="VAT"
          text={get(invoiceItem, ["tax_amount"], 0)}
          marginBottom={0}
        />
      </PropertyRow>
      {!isLast && (
        <HorizontalDivider style={{ margin: "10px 0" }} />
      )}
    </>
  );
};

export { InvoiceLineItem };
