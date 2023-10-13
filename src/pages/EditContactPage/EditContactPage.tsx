import { useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate, useParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { updatesContactService } from "../../services/sage";
import { useSetTitle, useContact, useRegisterElements } from "../../hooks";
import { getErrors } from "../../utils";
import { getContactValues } from "../../components/ContactForm";
import { EditContact } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/ContactForm";

const EditContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { contactId } = useParams();
  const { contact, isLoading } = useContact(contactId);
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    navigate(`/contact/view/${contactId}`);
  }, [navigate, contactId]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !contactId) {
      return Promise.resolve();
    }

    setError(null);

    return updatesContactService(client, contactId, getContactValues(values) as never)
      .then(() => navigate(`/contact/view/${contactId}`))
      .catch((err) => setError(getErrors(get(err, ["data"]))));
  }, [client, contactId, navigate]);

  useSetTitle("Edit Contact");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: `/contact/view/${contactId}` },
    });
  }, [contactId]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditContact
      error={error}
      contact={contact}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditContactPage };
