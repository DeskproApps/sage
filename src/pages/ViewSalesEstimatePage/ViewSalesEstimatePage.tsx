import { useMemo } from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements, useSetTitle } from "../../hooks";
import { useSalesEstimate } from "./hooks";
import { getSageLink } from "../../utils";
import { ViewSalesEstimate } from "../../components";
import type { FC } from "react";

const ViewSalesEstimatePage: FC = () => {
  const { estimateId } = useParams();
  const { estimate, isLoading } = useSalesEstimate(estimateId);
  const link = useMemo(() => getSageLink(get(estimate, ["links"])), [estimate]);
  const currency = useMemo(() => get(estimate, ["currency", "id"], "GBP"), [estimate]);

  useSetTitle(get(estimate, ["displayed_as"], ""));

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });

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
    <ViewSalesEstimate
      estimate={estimate}
      currency={currency}
    />
  );
};

export { ViewSalesEstimatePage };
