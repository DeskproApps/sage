import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockPurchaseInvoices } from "../../../../testing";
import { PurchaseInvoiceItem } from "../PurchaseInvoiceItem";
import type { Props } from "../PurchaseInvoiceItem";

const renderPurchaseInvoiceItem = (props?: Partial<Props>) => render((
  <PurchaseInvoiceItem
    invoice={props?.invoice || mockPurchaseInvoices.$items[0] as never}
    isLast={true}
  />
), { wrappers: { theme: true, router: "/home" } });

describe("SalesInvoiceItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderPurchaseInvoiceItem();

    expect(await findByText(/DPoN-001/i)).toBeInTheDocument();
    expect(await findByText(/DP-001/i)).toBeInTheDocument();
    expect(await findByText(/Unpaid/i)).toBeInTheDocument();
    expect(await findByText(/16 Oct, 2023/i)).toBeInTheDocument();
    expect(await findByText(/30 Nov, 2023/i)).toBeInTheDocument();
  });

  test("should navigate to purchase invoice details page", async () => {
    const { findByRole } = renderPurchaseInvoiceItem();
    const titleLink = await findByRole("link", { name: /DPoN-001/i });

    expect(window.location.hash).toBe("#/home");

    await userEvent.click(titleLink);

    expect(window.location.hash).toBe("#/purchase-invoices/c1b882f47562460f882a8ecdd434574e");
  });
});
