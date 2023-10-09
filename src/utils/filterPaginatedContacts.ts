import size from "lodash/size";
import flatten from "lodash/flatten";
import isEmpty from "lodash/isEmpty";
import type { Contact, Pagination } from "../services/sage/types";

const filterPaginatedContacts = (
  items: Array<Pagination<Contact>>,
): Array<Contact> => {
  if (!Array.isArray(items) || isEmpty(items)) {
    return [];
  }

  return flatten((items || [])
    .filter(({ $items }) => size($items))
    .map(({ $items }) => $items));
};

export { filterPaginatedContacts };
