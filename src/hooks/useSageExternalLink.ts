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
  newPurchaseInvoiceLink: Maybe<string>,
  newSalesQuoteLink: Maybe<string>,
  newSalesEstimateLink: Maybe<string>,
};

type UseSageExternalLink = (contactId?: Maybe<Contact["id"]>) => Result;

const useSageExternalLink: UseSageExternalLink = (contactId) => {
  const { contact, isLoading } = useContact(contactId);
  const [contactLink, setContactLink] = useState<Maybe<string>>(null);
  const [newSalesInvoiceLink, setNewSalesInvoiceLink] = useState<Maybe<string>>(null);
  const [newPurchaseInvoiceLink, setNewPurchaseInvoiceLink] = useState<Maybe<string>>(null);
  const [newSalesQuoteLink, setNewSalesQuoteLink] = useState<Maybe<string>>(null);
  const [newSalesEstimateLink, setNewSalesEstimateLink] = useState<Maybe<string>>(null);

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
        setNewPurchaseInvoiceLink(`${origin}/invoicing/purchase_invoices/new?contact_id=${contactNumber}`);
        setNewSalesEstimateLink(`https://accounts-extra.sageone.com/invoicing/sales_estimates/new?contact_id=${contactNumber}`);
        setNewSalesQuoteLink(`https://accounts-extra.sageone.com/invoicing/sales_quotes/new?contact_id=${contactNumber}`);
      } else if (origin) {
        setNewSalesInvoiceLink(`${origin}/invoicing/sales_invoices/new`);
        setNewPurchaseInvoiceLink(`${origin}/invoicing/purchase_invoices/new`);
        setNewSalesEstimateLink(`https://accounts-extra.sageone.com/invoicing/sales_estimates/new`);
        setNewSalesQuoteLink(`https://accounts-extra.sageone.com/invoicing/sales_quotes/new`);
      }
    }
  }, [contactLink]);

  return {
    isLoading,
    contactLink,
    newSalesQuoteLink,
    newSalesInvoiceLink,
    newSalesEstimateLink,
    newPurchaseInvoiceLink,
  };
};

export { useSageExternalLink };
