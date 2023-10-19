import { useState, useMemo, useCallback } from "react";
import find from "lodash/find";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { getEntityMetadata } from "../../utils";
import { useSetTitle, useAsyncError, useRegisterElements } from "../../hooks";
import { useSearchContacts } from "./hooks";
import { LinkContact } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Contact } from "../../services/sage/types";
import get from "lodash/get";

const LinkContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<Maybe<Contact["id"]>>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { contacts, isLoading } = useSearchContacts(searchQuery);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearch = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onNavigateToCreate = useCallback(() => navigate("/contact/create"), [navigate]);

  const onLinkContact = useCallback(() => {
    if (!client || !selectedContact || !dpUserId) {
      return;
    }

    setIsSubmitting(true);

    setEntityService(client, dpUserId, selectedContact, getEntityMetadata(find(contacts, { id: selectedContact })))
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedContact, asyncErrorHandler, navigate, contacts]);

  useSetTitle("Link Contact");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <LinkContact
      onChangeSearch={onChangeSearch}
      selectedContact={selectedContact}
      isSubmitting={isSubmitting}
      onLinkContact={onLinkContact}
      onCancel={onCancel}
      isLoading={isLoading}
      contacts={contacts}
      onChangeSelectedContact={setSelectedContact}
      onNavigateToCreate={onNavigateToCreate}
    />
  );
};

export { LinkContactPage };
