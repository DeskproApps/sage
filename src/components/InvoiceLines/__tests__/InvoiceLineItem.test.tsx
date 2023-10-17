import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoice } from "../../../../testing";
import { InvoiceLineItem } from "../InvoiceLineItem";
import type { Props } from "../InvoiceLineItem";

const renderInvoiceLineItem = (props?: Partial<Props>) => render((
  <InvoiceLineItem
    invoiceItem={props?.invoiceItem || mockSalesInvoice.invoice_lines[1] as never}
    currency={props?.currency || "GBP"}
    isLast={props?.isLast || false}
  />
), { wrappers: { theme: true } });

describe("ViewSalesInvoice", () => {
  describe("InvoiceLineItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderInvoiceLineItem();

      expect(await findByText(/A white t shirt/i)).toBeInTheDocument();

      expect(await findByText(/Qty/i)).toBeInTheDocument();
      expect(await findAllByText(/75\.0/i)).toHaveLength(3);

      expect(await findByText(/Price/i)).toBeInTheDocument();
      expect(await findByText(/25\.0/i)).toBeInTheDocument();

      expect(await findByText(/Discount/i)).toBeInTheDocument();
      expect(await findByText(/0\.0/i)).toBeInTheDocument();

      expect(await findByText(/VAT/i)).toBeInTheDocument();
      expect(await findByText(/375\.0/i)).toBeInTheDocument();
    });
  });
});
