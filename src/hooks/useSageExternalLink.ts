import { useState, useEffect } from "react";
import get from "lodash/get";
import last from "lodash/last";
import { useContact } from "./useContact";
import { getSageLink } from "../utils";
import type { Maybe } from "../types";
import type { Contact } from "../services/sage/types";

export type Result = {
  isLoading: boolean,
  contactLink: Maybe<string>,
  newSalesInvoiceLink: Maybe<string>,
};

type UseSageExternalLink = (contactId: Maybe<Contact["id"]>) => Result;

const useSageExternalLink: UseSageExternalLink = (contactId) => {
  const { contact, isLoading } = useContact(contactId);
  const [contactLink, setContactLink] = useState<Maybe<string>>(null);
  const [newSalesInvoiceLink, setNewSalesInvoiceLink] = useState<Maybe<string>>(null);

  useEffect(() => {
    const sageContactLink = getSageLink(get(contact, ["links"]));

    if (sageContactLink) {
      setContactLink(sageContactLink);
    }
  }, [contact]);

  useEffect(() => {
    if (contactLink) {
      const { origin, pathname } = new URL(contactLink);
      const contactNumber = last(pathname.split("/"));

      if (origin && contactNumber) {
        setNewSalesInvoiceLink(`${origin}/invoicing/sales_invoices/new?contact_id=${contactNumber}`);
      } else if (origin) {
        setNewSalesInvoiceLink(`${origin}/invoicing/sales_invoices/new`);
      }
    }
  }, [contactLink]);

  return { isLoading, contactLink, newSalesInvoiceLink };
};

export { useSageExternalLink };
