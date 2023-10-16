import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getContactsService } from "../../services/sage";
import { QueryKey } from "../../query";
import type { Contact } from "../../services/sage/types";
import size from "lodash/size";

type Result = {
  isLoading: boolean,
  contacts: Array<Contact>,
};

type UseSearchContacts = (q?: string) => Result;

const useSearchContacts: UseSearchContacts = (query) => {
  const contacts = useQueryWithClient(
    [QueryKey.SEARCH_QUERY, query as string],
    (client) => getContactsService(client, { search: query || "" }),
    { enabled: size(query) > 2 },
  );

  return {
    isLoading: [contacts].some(({ isFetching }) => isFetching),
    contacts: get(contacts, ["data", "$items"], []) || [],
  };
}

export { useSearchContacts };
