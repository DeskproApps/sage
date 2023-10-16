import { useMemo } from "react";
import get from "lodash/get";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { getSageLink } from "../../utils";
import { SageLogo, RouterLink } from "../common";
import type { FC } from "react";
import type { PurchaseInvoice } from "../../services/sage/types";

export type Props = {
  invoice: PurchaseInvoice,
  isLast: boolean,
};

const PurchaseInvoiceItem: FC<Props> = ({ invoice, isLast }) => {
  const link = useMemo(() => getSageLink(get(invoice, ["links"])), [invoice]);

  return (
    <>
      <Title
        title={(
          <RouterLink to={`/purchase-invoices/${invoice.id}`}>
            {get(invoice, ["displayed_as"], "-")}
          </RouterLink>
        )}
        marginBottom={7}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />

      <TwoProperties
        leftLabel="Reference"
        leftText={get(invoice, ["contact_reference"], "-")}
        rightLabel="Status"
        rightText={get(invoice, ["status", "displayed_as"], "-")}
      />

      <TwoProperties
        leftLabel="Invoice Date"
        leftText={format(get(invoice, ["created_at"]))}
        rightLabel="Due Date"
        rightText={format(get(invoice, ["due_date"]))}
      />

      {!isLast && (
        <HorizontalDivider style={{ marginBottom: "10px" }}/>
      )}
    </>
  );
};

export { PurchaseInvoiceItem };
