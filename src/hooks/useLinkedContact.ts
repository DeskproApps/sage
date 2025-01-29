import { useMemo, useCallback } from "react";
import get from "lodash/get";
import difference from "lodash/difference";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  setEntityService,
  deleteEntityService,
  getEntityListService,
} from "../services/deskpro";
import { getContactsService } from "../services/sage";
import { filterPaginatedContacts } from "../utils";
import type { UserContext } from "../types";
import type { Contact } from "../services/sage/types";

export type Result = {
  findContact: () => Promise<void|Contact["id"]>,
  linkContact: (contactId: Contact["id"]) => Promise<void>,
};

type UseLinkedContact = () => Result;

const useLinkedContact: UseLinkedContact = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);
  const dpPrimaryEmail = useMemo(() => get(context, ["data", "user", "primaryEmail"]), [context]);
  const dpEmails = useMemo(() => {
    const emails = get(context, ["data", "user", "emails"], []);
    return difference(emails, [dpPrimaryEmail]) || [];
  }, [context, dpPrimaryEmail]);

  const findContact = useCallback(async () => {
    if (!client || !dpUserId) {
      throw Error("Deskpro apps client is not ready yet");
    }

    // 1. Is the contact linked to the deskpro user?
    const contactId = (await getEntityListService(client, dpUserId))[0];

    if (contactId) {
      return contactId;
    }

    // 2. Trying to find a contact by primary email
    const contactsByPrimaryEmail = await getContactsService(client, { email: dpPrimaryEmail?? "" });
    const contactIdByPrimaryEmail = get(contactsByPrimaryEmail, ["$items", 0, "id"]);

    if (contactIdByPrimaryEmail) {
      return contactIdByPrimaryEmail;
    }

    // 3. Trying to find a contact by additional emails
    const contactsByAdditionalEmails = await Promise.all(
      dpEmails.map((email) => getContactsService(client, { email: email?? "" }))
    );

    const contactsAdditional = filterPaginatedContacts(contactsByAdditionalEmails);

    return get(contactsAdditional, [0, "id"]);
  }, [client, dpUserId, dpPrimaryEmail, dpEmails]);

  const linkContact = useCallback(async (contactId: Contact["id"]) => {
    if (!client || !dpUserId) {
      throw Error("Deskpro apps client is not ready yet");
    }

    if (!contactId) {
      throw Error("No contact to be linked");
    }

    // 1. get linked contacts
    const entityIds = await getEntityListService(client, dpUserId);

    // 2. remove all linked contacts
    await Promise.all(entityIds.map((unlinkContactId) =>
      deleteEntityService(client, dpUserId, unlinkContactId)
    ));

    // 3. link contact
    return setEntityService(client, dpUserId, contactId);
  }, [client, dpUserId]);

  return { findContact, linkContact };
};

export { useLinkedContact };
