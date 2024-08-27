import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "./utils";
import { useLogout, useUnlinkContact } from "./hooks";
import {
  HomePage,
  LoginPage,
  LoadingAppPage,
  LinkContactPage,
  ViewContactPage,
  EditContactPage,
  SalesQuotesPage,
  CreateContactPage,
  AdminCallbackPage,
  SalesInvoicesPage,
  ViewSalesQuotePage,
  SalesEstimatesPage,
  NoLinkedContactPage,
  PurchaseInvoicesPage,
  ViewSalesInvoicePage,
  ViewSalesEstimatePage,
  ViewPurchaseInvoicePage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkContact();
  const isLoading = [isLoadingLogout, isLoadingUnlink].some(Boolean)

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("logout", logout)
      .with("unlink", unlink)
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Routes>
      <Route path="/admin/callback" element={<AdminCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/no-linked" element={<NoLinkedContactPage />} />
      <Route path="/contact/link" element={<LinkContactPage />} />
      <Route path="/contact/view/:contactId" element={<ViewContactPage />} />
      <Route path="/contact/create" element={<CreateContactPage />} />
      <Route path="/contact/edit/:contactId" element={<EditContactPage />} />
      <Route path="/sales-invoices" element={<SalesInvoicesPage />} />
      <Route path="/sales-invoices/:salesInvoiceId" element={<ViewSalesInvoicePage />} />
      <Route path="/purchase-invoices" element={<PurchaseInvoicesPage />} />
      <Route path="/purchase-invoices/:purchaseInvoiceId" element={<ViewPurchaseInvoicePage />} />
      <Route path="/sales-quotes" element={<SalesQuotesPage />} />
      <Route path="/sales-quotes/:quoteId" element={<ViewSalesQuotePage />} />
      <Route path="/sales-estimates" element={<SalesEstimatesPage />} />
      <Route path="/sales-estimates/:estimateId" element={<ViewSalesEstimatePage />} />
      <Route index element={<LoadingAppPage />} />
    </Routes>
  );
}

export { App };
