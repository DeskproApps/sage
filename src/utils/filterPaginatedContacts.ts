import size from "lodash/size";
import flatten from "lodash/flatten";
import isEmpty from "lodash/isEmpty";
import type { definitions, Pagination } from "../services/sage/types";

const filterPaginatedContacts = (
  items: Array<Pagination<definitions["Contact"]>>,
): Array<definitions["Contact"]> => {
  if (!Array.isArray(items) || isEmpty(items)) {
    return [];
  }

  return flatten((items || []).filter(({ $items }) => size($items)).map(({ $items }) => $items));
};

export { filterPaginatedContacts };
