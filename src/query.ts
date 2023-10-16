import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const QueryKey = {
  SEARCH_QUERY: "SEARCH_QUERY",
  CONTACT: "contact",
  CONTACTS: "contacts",
  LINKED_CONTACTS: "linkedContacts",
  SALES_INVOICES: "salesInvoices",
  SALES_INVOICE: "salesInvoice",
  CONTACT_TYPES: "contactTypes",
  COUNTRIES: "countries",
}

export { queryClient, QueryKey };
