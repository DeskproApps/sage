import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoice } from "../../../../testing";
import { InvoiceLines } from "../InvoiceLines";
import type { Props } from "../InvoiceLines";

const renderInvoiceLines = (props?: Partial<Props>) => render((
  <InvoiceLines
    invoiceLines={props?.invoiceLines || mockSalesInvoice.invoice_lines as never}
    currency={props?.currency || "GBR"}
  />
), { wrappers: { theme: true } });

describe("InvoiceLines", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderInvoiceLines();

    expect(await findByText(/A black t shirt/i)).toBeInTheDocument();
    expect(await findByText(/A white t shirt/i)).toBeInTheDocument();
    expect(await findByText(/Jeans/i)).toBeInTheDocument();
  });

  test("should show \"no found\" if no items", async () => {
    const { findByText } = renderInvoiceLines({ invoiceLines: [] });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
