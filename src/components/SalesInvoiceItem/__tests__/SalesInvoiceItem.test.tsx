import { cleanup, act } from "@testing-library/react";
import { mockSalesInvoices, render } from "../../../../testing";
import { SalesInvoiceItem } from "../SalesInvoiceItem";
import type { Props } from "../SalesInvoiceItem";

const renderSalesInvoiceItem = (props?: Partial<Props>) => render((
  <SalesInvoiceItem
    isLast={false}
    invoice={props?.invoice || mockSalesInvoices.$items[0] as never}
  />
), { wrappers: { theme: true, router: "/home" } });

describe("SalesInvoiceItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesInvoiceItem();

    expect(await findByText(/SI-2/i)).toBeInTheDocument();
    expect(await findByText(/DP-002/i)).toBeInTheDocument();
    expect(await findByText(/Unpaid/i)).toBeInTheDocument();
    expect(await findByText(/29 Sep, 2023/i)).toBeInTheDocument();
    expect(await findByText(/29 Oct, 2023/i)).toBeInTheDocument();
  });

  test("should navigate to sales invoice details page", async () => {
    const { findByRole } = renderSalesInvoiceItem();
    const titleLink = await findByRole("link", { name: /SI-2/i });

    expect(window.location.hash).toBe("#/home");

   await act(async () => {
     await titleLink.click();
   });

    expect(window.location.hash).toBe("#/sales-invoices/9c5ba5b37adf4bc29487931ffee67d5f");
  });
});
