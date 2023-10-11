import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoices } from "../../../../testing";
import { SalesInvoices } from "../SalesInvoices";
import type { Props } from "../SalesInvoices";

const renderSalesInvoices = (props?: Partial<Props>) => render((
  <SalesInvoices salesInvoices={props?.salesInvoices || []} />
), { wrappers: { theme: true, router: true } });

describe("SalesInvoices", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesInvoices({
      salesInvoices: mockSalesInvoices.$items,
    } as never);

    expect(await findByText(/Sales Invoices \(3\)/i)).toBeInTheDocument();
    expect(await findByText(/SI-2/i)).toBeInTheDocument();
    expect(await findByText(/SI-3/i)).toBeInTheDocument();
    expect(await findByText(/SI-5/i)).toBeInTheDocument();
  });

  test("should show no found", async () => {
    const { findByText } = renderSalesInvoices();
    
    expect(await findByText(/Sales Invoices \(0\)/i)).toBeInTheDocument();
    expect(await findByText(/No Sales Invoices found/i)).toBeInTheDocument();
  });
});
