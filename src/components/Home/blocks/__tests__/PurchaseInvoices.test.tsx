import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockPurchaseInvoices } from "../../../../../testing";
import { PurchaseInvoices } from "../PurchaseInvoices";
import type { Props } from "../PurchaseInvoices";

const renderPurchaseInvoices = (props?: Partial<Props>) => render((
  <PurchaseInvoices
    purchaseInvoices={props?.purchaseInvoices || mockPurchaseInvoices.$items as never[]}
    newPurchaseInvoiceLink={props?.newPurchaseInvoiceLink || null}
    onNavigateToPurchaseInvoices={props?.onNavigateToPurchaseInvoices || jest.fn()}
  />
), { wrappers: { theme: true, router: true } });

describe("PurchaseInvoices", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderPurchaseInvoices();

    expect(await findByText(/Purchase Invoices \(1\)/i)).toBeInTheDocument();
    expect(await findByText(/DPoN-001/i)).toBeInTheDocument();
  });

  test("should show icon link to create new one", async () => {
    const href = "https://sage.com/link-to-create-now-invoice";
    const { container } = renderPurchaseInvoices({ newPurchaseInvoiceLink: href });

    const link = container.querySelector(`a[href="${href}"]`);
    expect(link).toBeInTheDocument();
  });

  test("should show \"No found\" if now invoices", async () => {
    const { findByText } = renderPurchaseInvoices({ purchaseInvoices: [] });
    expect(await findByText(/No Purchase Invoices found/i)).toBeInTheDocument();
  });

  test("should navigate to invoice list page", async () => {
    const mockOnNavigate = jest.fn();

    const { findByRole } = renderPurchaseInvoices({ onNavigateToPurchaseInvoices: mockOnNavigate });

    const title = await findByRole("link", { name: /Purchase Invoices/i });
    await userEvent.click(title);

    expect(mockOnNavigate).toBeCalled();
  });
});
