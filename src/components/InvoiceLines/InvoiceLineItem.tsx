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
  return (
    <>
      <Stack justify="space-between" style={{ marginBottom: 10 }}>
        <P5>{get(invoiceItem, ["description"], "-")}</P5>
        <P4>
          {formatPrice(get(invoiceItem, ["net_amount"], "0") || "0", { currency })}
        </P4>
      </Stack>
      <PropertyRow>
        {[
          <Property
            key="qty"
            label="Qty"
            text={formatPrice(get(invoiceItem, ["quantity"], "1"), { style: "decimal" })}
            marginBottom={0}
          />,
          <Property
            key="price"
            label="Price"
            text={formatPrice(get(invoiceItem, ["unit_price"], "0"), { style: "decimal" })}
            marginBottom={0}
          />,
          skipDiscount ? undefined : <Property
            key="discount"
            label="Discount"
            text={formatPrice(get(invoiceItem, ["discount_amount"], "0"), { style: "decimal" })}
            marginBottom={0}
          />,
          <Property
            key="vat"
            label="VAT"
            text={formatPrice(get(invoiceItem, ["tax_amount"], "0"), { style: "decimal" })}
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
