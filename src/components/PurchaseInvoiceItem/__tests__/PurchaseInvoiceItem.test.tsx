import { cleanup } from "@testing-library/react";
import { render, mockPurchaseInvoices } from "../../../../testing";
import { PurchaseInvoiceItem } from "../PurchaseInvoiceItem";
import type { Props } from "../PurchaseInvoiceItem";

const renderPurchaseInvoiceItem = (props?: Partial<Props>) => render((
  <PurchaseInvoiceItem
    invoice={props?.invoice || mockPurchaseInvoices.$items[0] as never}
    isLast={true}
  />
), { wrappers: { theme: true, router: true } });

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
});
