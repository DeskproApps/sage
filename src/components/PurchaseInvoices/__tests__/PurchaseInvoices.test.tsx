import { cleanup } from "@testing-library/react";
import { render, mockPurchaseInvoices } from "../../../../testing";
import { PurchaseInvoices } from "../PurchaseInvoices";
import type { Props } from "../PurchaseInvoices";

const renderPurchaseInvoices = (props?: Partial<Props>) => render((
  <PurchaseInvoices
    newPurchaseInvoiceLink={props?.newPurchaseInvoiceLink || null}
    purchaseInvoices={props?.purchaseInvoices || mockPurchaseInvoices.$items as never[]}
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

  test("should show no found", async () => {
    const { findByText } = renderPurchaseInvoices({ purchaseInvoices: [] });

    expect(await findByText(/Purchase Invoices \(0\)/i)).toBeInTheDocument();
    expect(await findByText(/No Purchase Invoices found/i)).toBeInTheDocument();
  });
});
