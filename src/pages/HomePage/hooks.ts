import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import size from "lodash/size";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import {
  getContactService,
  getSalesInvoicesService,
} from "../../services/sage";
import { QueryKey } from "../../query";
import type { UserContext } from "../../types";
import type { definitions } from "../../services/sage/types";

type ContactId = Required<definitions["Contact"]>["id"];

type Result = {
  isLoading: boolean;
  contact: definitions["Contact"];
  salesInvoices: Array<definitions["SalesInvoice"]>;
};

type UseContact = () => Result;

const useContact: UseContact = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const contactIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACTS, dpUserId],
    (client) => getEntityListService(client, dpUserId),
    {
      onSuccess: (items) => {
        if (!size(items)) {
          navigate(`/no-linked`);
        }
      },
    },
  );

  const contactId = useMemo(() => get(contactIds, ["data", 0]), [contactIds]);

  const contact = useQueryWithClient(
    [QueryKey.CONTACT, contactId as ContactId],
    (client) => getContactService(client, contactId as ContactId),
    { enabled: Boolean(contactId) },
  );

  const salesInvoices = useQueryWithClient(
    [QueryKey.SALES_INVOICES, contactId as ContactId],
    (client) => getSalesInvoicesService(client, contactId),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [contact, salesInvoices].some(({ isLoading }) => isLoading),
    contact: contact.data as definitions["Contact"],
    salesInvoices: get(salesInvoices, ["data", "$items"], []) || [],
  };
}

export { useContact };
