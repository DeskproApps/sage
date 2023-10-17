import { useMemo } from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { usePurchaseInvoice } from "./hooks";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { getSageLink } from "../../utils";
import { ViewPurchaseInvoice } from "../../components";
import type { FC } from "react";

const ViewPurchaseInvoicePage: FC = () => {
  const { purchaseInvoiceId } = useParams();
  const { isLoading, purchaseInvoice } = usePurchaseInvoice(purchaseInvoiceId);
  const link = useMemo(() => getSageLink(get(purchaseInvoice, ["links"])), [purchaseInvoice]);
  const currency = useMemo(() => get(purchaseInvoice, ["currency", "id"], "GBP"), [purchaseInvoice]);

  useSetTitle(get(purchaseInvoice, ["displayed_as"], ""));

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
    <ViewPurchaseInvoice
      currency={currency}
      purchaseInvoice={purchaseInvoice}
    />
  );
};

export { ViewPurchaseInvoicePage };
