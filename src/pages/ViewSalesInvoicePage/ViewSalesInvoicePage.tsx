import get from "lodash/get";
import { useParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useSalesInvoice } from "./hooks";
import { ViewSalesInvoice } from "../../components";
import type { FC } from "react";

const ViewSalesInvoicePage: FC = () => {
  const { salesInvoiceId } = useParams();
  const { isLoading, salesInvoice } = useSalesInvoice(salesInvoiceId);

  useSetTitle(get(salesInvoice, ["displayed_as"], ""));

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("refresh", { type: "refresh_button" });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewSalesInvoice salesInvoice={salesInvoice}/>
  );
};

export { ViewSalesInvoicePage };
