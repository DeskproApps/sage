import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockSalesInvoices } from "../../../../../testing";
import { SalesInvoices } from "../SalesInvoices";
import type { Props } from "../SalesInvoices";

const renderSalesInvoices = (props?: Partial<Props>) => render((
  <SalesInvoices
    salesInvoices={props?.salesInvoices || []}
    onNavigateToSalesInvoices={props?.onNavigateToSalesInvoices || jest.fn()}
  />
), { wrappers: { theme: true, router: true } });

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
    expect(await findByText(/SI-5/i)).toBeInTheDocument();
  });

  test("should navigate to SalesInvoice page", async () => {
    const mockOnNavigate = jest.fn();
    const { findByRole } = renderSalesInvoices({ onNavigateToSalesInvoices: mockOnNavigate });
    const link = await findByRole("link", { name: /Sales Invoices/i });

    await userEvent.click(link);

    expect(mockOnNavigate).toHaveBeenCalled();
  });
});
