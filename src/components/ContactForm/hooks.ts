import { useMemo } from "react";
import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getCountriesService,
  getContactTypesService,
} from "../../services/sage";
import { QueryKey } from "../../query";
import { retryUntilHavePagination, getOptions } from "../../utils";
import type { Option } from "../../types";
import type { Country, ContactType } from "../../services/sage/types";

type UseFormDeps = () => {
  isLoading: boolean,
  contactTypeOptions: Array<Option<ContactType["id"]>>,
  countyOptions: Array<Option<Country["id"]>>
};

const retryCountriesService = retryUntilHavePagination(getCountriesService);

const useFormDeps: UseFormDeps = () => {
  const contactTypes = useQueryWithClient([QueryKey.CONTACT_TYPES], getContactTypesService);

  const countries = useQueryWithClient([QueryKey.COUNTRIES], retryCountriesService);

  return {
    isLoading: [contactTypes, countries].some(({ isLoading }) => isLoading),
    contactTypeOptions: useMemo(() => getOptions(get(contactTypes, ["data", "$items"])), [contactTypes]),
    countyOptions: useMemo(() => getOptions(get(countries, ["data", "$items"])), [countries]),
  };
};

export { useFormDeps };
