import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getContactService } from "../../services/sage";
import { QueryKey } from "../../query";
import type { definitions } from "../../services/sage/types";

type ContactId = Required<definitions["Contact"]>["id"];

type UseContact = (contactId?: ContactId) => {
  isLoading: boolean,
  contact: definitions["Contact"],
};

const useContact: UseContact = (contactId) => {
  const contact = useQueryWithClient(
    [QueryKey.CONTACT, contactId as ContactId],
    (client) => getContactService(client, contactId as ContactId),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [contact].some(({ isLoading }) => isLoading),
    contact: get(contact, ["data"]) as definitions["Contact"],
  };
};

export { useContact };
