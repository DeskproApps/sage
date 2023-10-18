import { useMemo } from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements, useSetTitle } from "../../hooks";
import { useSalesQuote } from "./hooks";
import { getSageLink } from "../../utils";
import { ViewSalesQuote } from "../../components";
import type { FC } from "react";

const ViewSalesQuotePage: FC = () => {
  const { quoteId } = useParams();
  const { quote, isLoading } = useSalesQuote(quoteId);
  const link = useMemo(() => getSageLink(get(quote, ["links"])), [quote]);
  const currency = useMemo(() => get(quote, ["currency", "id"], "GBP"), [quote]);

  useSetTitle(get(quote, ["displayed_as"], ""));

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
    <ViewSalesQuote
      quote={quote}
      currency={currency}
    />
  );
};

export { ViewSalesQuotePage };
