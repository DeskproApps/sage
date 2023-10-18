import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import { getSalesEstimateServices } from "../../services/sage";
import type { SalesEstimate } from "../../services/sage/types";

type UseSalesEstimate = (estimateId?: SalesEstimate["id"]) => {
  isLoading: boolean,
  estimate: SalesEstimate,
};

const useSalesEstimate: UseSalesEstimate = (estimateId) => {
  const estimate = useQueryWithClient(
    [QueryKey.SALES_ESTIMATES, estimateId as SalesEstimate["id"]],
    (client) => getSalesEstimateServices(client, estimateId as SalesEstimate["id"]),
    { enabled: Boolean(estimateId) },
  );

  return {
    isLoading: estimate.isLoading,
    estimate: estimate.data as SalesEstimate,
  };
};

export { useSalesEstimate };
