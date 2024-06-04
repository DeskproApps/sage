import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { wrap, mockContactCustomer } from "../../../testing";
import { getContactService } from "../../services/sage";
import { useSageExternalLink } from "../useSageExternalLink";
import type { Result } from "../useSageExternalLink";

const renderUseLinkedContact = () => renderHook<Result, unknown>(
  () => useSageExternalLink("contact-001"),
  {
    wrapper: ({ children }) => wrap(children as never, { query: true })
  },
);

jest.mock("../../services/sage/getContactService");

describe("useSageExternalLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return contactLink, newSalesInvoiceLink, newPurchaseInvoiceLink", async () => {
    (getContactService as jest.Mock).mockResolvedValueOnce(mockContactCustomer);

    const { result } = renderUseLinkedContact();

    await waitFor(() => {
      expect(result.current.contactLink).toBe("https://accounts-extra.sageone.com/contacts/customers/145570473");
      expect(result.current.newSalesInvoiceLink).toBe("https://accounts-extra.sageone.com/invoicing/sales_invoices/new?contact_id=145570473");
      expect(result.current.newPurchaseInvoiceLink).toBe("https://accounts-extra.sageone.com/invoicing/purchase_invoices/new?contact_id=145570473");
    })
  });
});
