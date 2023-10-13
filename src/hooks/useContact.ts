import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getContactService } from "../services/sage";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Contact } from "../services/sage/types";

type UseContact = (contactId: Maybe<Contact["id"]>) => {
  isLoading: boolean,
  contact: Contact,
};

const useContact: UseContact = (contactId) => {
  const contact = useQueryWithClient(
    [QueryKey.CONTACT, contactId as Contact["id"]],
    (client) => getContactService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [contact].some(({ isLoading }) => isLoading),
    contact: get(contact, ["data"]) as Contact,
  };
};

export { useContact };
