import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSalesEstimatesServices } from "../services/sage";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Contact, SalesEstimate } from "../services/sage/types";

type UseSalesEstimates = (contactId?: Maybe<Contact["id"]>) => {
  isLoading: boolean,
  estimates: Array<SalesEstimate>,
};

const useSalesEstimates: UseSalesEstimates = (contactId) => {
  const estimates = useQueryWithClient(
    [QueryKey.SALES_ESTIMATES, contactId as Contact["id"]],
    (client) => getSalesEstimatesServices(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: estimates.isLoading,
    estimates: get(estimates, ["data", "$items"], []) || [],
  };
};

export { useSalesEstimates };
