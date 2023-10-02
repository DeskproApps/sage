import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useContact } from "./hooks";
import { Home } from "../../components";

import type { FC } from "react";

const HomePage: FC = () => {
  const { contact, salesInvoices, isLoading } = useContact();

  useSetTitle("Sage");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" }},
        { title: "Unlink Contact", payload: { type: "unlink" }},
      ],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      contact={contact}
      salesInvoices={salesInvoices}
    />
  );
};

export { HomePage };
