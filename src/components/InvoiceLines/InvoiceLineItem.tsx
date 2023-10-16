import { useMemo } from "react";
import get from "lodash/get";
import { P4, P5, Stack } from "@deskpro/deskpro-ui";
import { PropertyRow, Property, HorizontalDivider } from "@deskpro/app-sdk";
import { formatPrice } from "../../utils";
import type { FC } from "react";
import type { SalesInvoiceLineItem, PurchaseInvoiceLineItem } from "../../services/sage/types";

export type Props = {
  invoiceItem: SalesInvoiceLineItem|PurchaseInvoiceLineItem,
  isLast: boolean,
  currency: string,
  skipDiscount?: boolean,
};

const InvoiceLineItem: FC<Props> = ({ invoiceItem, isLast, currency, skipDiscount }) => {
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
        {[
          <Property
            key="qty"
            label="Qty"
            text={get(invoiceItem, ["quantity"], 1)}
            marginBottom={0}
          />,
          <Property
            key="price"
            label="Price"
            text={get(invoiceItem, ["unit_price"], 0)}
            marginBottom={0}
          />,
          skipDiscount ? undefined : <Property
            key="discount"
            label="Discount"
            text={get(invoiceItem, ["discount_amount"], 0)}
            marginBottom={0}
          />,
          <Property
            key="vat"
            label="VAT"
            text={get(invoiceItem, ["tax_amount"], 0)}
            marginBottom={0}
          />
        ].filter(Boolean)}
      </PropertyRow>
      {!isLast && (
        <HorizontalDivider style={{ margin: "10px 0" }} />
      )}
    </>
  );
};

export { InvoiceLineItem };
