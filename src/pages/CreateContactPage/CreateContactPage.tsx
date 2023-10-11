import { useState, useMemo, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useDeskproUserAsContact } from "./hooks";
import { setEntityService } from "../../services/deskpro";
import { createContactService } from "../../services/sage";
import { getContactValues, getErrors } from "../../components/ContactForm";
import { CreateContact } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { FormValidationSchema } from "../../components/ContactForm";

const CreateContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { contact } = useDeskproUserAsContact();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/contact/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !dpUserId) {
      return Promise.resolve();
    }

    setError(null);

    return createContactService(client, getContactValues(values) as never)
      .then((contact) => setEntityService(client, dpUserId, contact.id))
      .then(() => navigate("/home"))
      .catch((err) => setError(getErrors(get(err, ["data"]))));
  }, [client, dpUserId, navigate]);

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
    <CreateContact
      contact={contact}
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateContactPage };
