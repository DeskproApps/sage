import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useSearchContacts } from "./hooks";
import { LinkContact } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { definitions } from "../../services/sage/types";
import get from "lodash/get";

const LinkContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<Maybe<definitions["Contact"]["id"]>>(null);
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

    setEntityService(client, dpUserId, selectedContact)
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedContact, asyncErrorHandler, navigate]);

  useSetTitle("Link Contact");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
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
