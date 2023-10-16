import { useMemo } from "react";
import get from "lodash/get";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { getSageLink } from "../../utils";
import { RouterLink, SageLogo } from "../common";
import type { FC } from "react";
import type { SalesInvoice } from "../../services/sage/types";

export type Props = {
  invoice: SalesInvoice,
  isLast: boolean,
};

const SalesInvoiceItem: FC<Props> = ({ invoice, isLast }) => {
  const link = useMemo(() => getSageLink(get(invoice, ["links"])), [invoice]);

  return (
    <>
      <Title
        title={(
          <RouterLink to={`/sales-invoices/${invoice.id}`}>
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
}

export { SalesInvoiceItem };
