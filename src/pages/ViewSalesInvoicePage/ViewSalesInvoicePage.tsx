import { useMemo } from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useSalesInvoice } from "./hooks";
import { getSageLink } from "../../utils";
import { ViewSalesInvoice } from "../../components";
import type { FC } from "react";

const ViewSalesInvoicePage: FC = () => {
  const { salesInvoiceId } = useParams();
  const { isLoading, salesInvoice } = useSalesInvoice(salesInvoiceId);
  const link = useMemo(() => getSageLink(get(salesInvoice, ["links"])), [salesInvoice]);
  const currency = useMemo(() => get(salesInvoice, ["currency", "id"], "GBR"), [salesInvoice]);

  useSetTitle(get(salesInvoice, ["displayed_as"], ""));

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("refresh", { type: "refresh_button" });

    if (link) {
      registerElement("link", {
        type: "cta_external_link",
        url: link,
        hasIcon: true,
      });
    }
  }, [link]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewSalesInvoice
      currency={currency}
      salesInvoice={salesInvoice}
    />
  );
};

export { ViewSalesInvoicePage };
