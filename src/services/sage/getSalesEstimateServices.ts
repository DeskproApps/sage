import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { SalesEstimate } from "./types";

const getSalesEstimateServices = (
  client: IDeskproClient,
  estimateId: SalesEstimate["id"],
) => {
  return baseRequest<SalesEstimate>(client, {
    url: `/sales_estimates/${estimateId}`,
    queryParams: {
      attributes: "all",
      nested_attributes: "all",
    },
  });
};

export { getSalesEstimateServices };
