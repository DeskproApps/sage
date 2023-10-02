import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoices } from "../../../../../testing";
import { SalesInvoices, SalesInvoiceItem } from "../SalesInvoices";
import type { Props, SalesInvoiceItemProps } from "../SalesInvoices";

const renderSalesInvoices = (props?: Partial<Props>) => render((
  <SalesInvoices salesInvoices={props?.salesInvoices || []} />
), { wrappers: { theme: true } });

const renderSalesInvoiceItem = (props?: Partial<SalesInvoiceItemProps>) => render((
  <SalesInvoiceItem
    isLast={false}
    invoice={props?.invoice || mockSalesInvoices.$items[0] as never}
  />
), { wrappers: { theme: true } });

describe("SalesInvoices", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesInvoices({ salesInvoices: mockSalesInvoices.$items as never });

    expect(await findByText(/Sales Invoices \(3\)/i)).toBeInTheDocument();
    expect(await findByText(/SI-2/i)).toBeInTheDocument();
    expect(await findByText(/SI-3/i)).toBeInTheDocument();
    expect(await findByText(/SI-4/i)).toBeInTheDocument();
  });

  test.todo("should navigate to SalesInvoice page");

  describe("SalesInvoiceItem", () => {
    test("render", async () => {
      const { findByText } = renderSalesInvoiceItem();

      expect(await findByText(/SI-2/i)).toBeInTheDocument();
      expect(await findByText(/DST001/i)).toBeInTheDocument();
      expect(await findByText(/Unpaid/i)).toBeInTheDocument();
      expect(await findByText(/29 Sep, 2023/i)).toBeInTheDocument();
      expect(await findByText(/29 Oct, 2023/i)).toBeInTheDocument();
    });
  });
});
