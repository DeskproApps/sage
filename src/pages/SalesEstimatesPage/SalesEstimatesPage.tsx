import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useSalesEstimates,
  useRegisterElements,
  useSageExternalLink,
} from "../../hooks";
import { SalesEstimates } from "../../components";
import type { FC } from "react";

const SalesEstimatesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId");
  const { estimates, isLoading: isLoadingEstimate } = useSalesEstimates(contactId);
  const { newSalesEstimateLink, isLoading: isLoadingLink } = useSageExternalLink(contactId);
  const isLoading = [isLoadingEstimate, isLoadingLink].some(Boolean);

  useSetTitle("SalesEstimates");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <SalesEstimates
      estimates={estimates}
      newSalesEstimateLink={newSalesEstimateLink}
    />
  );
};

export { SalesEstimatesPage };
