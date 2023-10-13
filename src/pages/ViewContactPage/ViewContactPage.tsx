import { useMemo } from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useContact, useRegisterElements } from "../../hooks";
import { ViewContact } from "../../components";
import type { FC } from "react";

const ViewContactPage: FC = () => {
  const { contactId } = useParams();
  const { contact, isLoading } = useContact(contactId);
  const title = useMemo(() => get(contact, ["reference"], ""), [contact]);

  useSetTitle(title);

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: `/contact/edit/${contactId}` },
    });
  }, [contactId]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewContact contact={contact} />
  );
};

export { ViewContactPage };
