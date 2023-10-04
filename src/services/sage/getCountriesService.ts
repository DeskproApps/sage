import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { Country, Pagination } from "./types";

const getCountriesService = (
  client: IDeskproClient,
  params?: Dict<string>,
) => {
  const queryParams = params || {};
  return baseRequest<Pagination<Country>>(client, {
    url: "/countries",
    queryParams: {
      items_per_page: "200",
      ...queryParams,
    },
  });
};

export { getCountriesService };
