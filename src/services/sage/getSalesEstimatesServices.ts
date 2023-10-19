import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, SalesEstimate, Pagination } from "./types";

const getSalesEstimatesServices = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Pagination<SalesEstimate>>(client, {
    url: "/sales_estimates",
    queryParams: {
      contact_id: contactId,
      attributes: "all",
    },
  });
};

export { getSalesEstimatesServices };
