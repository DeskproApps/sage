import { useNavigate } from "react-router-dom";
import size from "lodash/size";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { QueryKey } from "../../query";
import type { UserContext } from "../../types";
import type { Contact } from "../../services/sage/types";

export type Result = {
  isLoading: boolean,
  contactId: Contact["id"],
};

type UseContactId = () => Result;

const useContactId: UseContactId = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = context.data?.user.id;

  const contactIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACTS, dpUserId ?? ""],
    (client) => getEntityListService(client, dpUserId ?? ""),
    {
      onSuccess: (items) => {
        if (!size(items)) {
          navigate("/no-linked");
        }
      },
    },
  );

  const contactId = contactIds.data?.[0] ?? "";

  return {
    isLoading: [contactIds].some(({ isLoading }) => isLoading),
    contactId: contactId,
  };
}

export { useContactId };
