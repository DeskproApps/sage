import { cleanup, act } from "@testing-library/react";
import { render, mockSalesQuotes } from "../../../../testing";
import { SalesQuoteItem } from "../SalesQuoteItem";
import type { Props } from "../SalesQuoteItem";

const renderSalesQuoteItem = (props?: Partial<Props>) => render((
  <SalesQuoteItem
    isLast
    quote={props?.quote || mockSalesQuotes.$items[0] as never}
  />
), { wrappers: { theme: true, router: "/home" } });

describe("SalesInvoiceItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesQuoteItem();

    expect(await findByText(/SQ-2/i)).toBeInTheDocument();
    expect(await findByText(/DP-002/i)).toBeInTheDocument();
    expect(await findByText(/Pending/i)).toBeInTheDocument();
    expect(await findByText(/15 Oct, 2023/i)).toBeInTheDocument();
    expect(await findByText(/14 Nov, 2023/i)).toBeInTheDocument();
  });

  test("should navigate to sales quote details page", async () => {
    const { findByRole } = renderSalesQuoteItem();
    const titleLink = await findByRole("link", { name: /SQ-2/i });

    expect(window.location.hash).toBe("#/home");

    await act(async () => {
      await titleLink.click();
    });

    expect(window.location.hash).toBe("#/sales-quotes/d20d239b74ae49c3a5ff23f39249d944");
  });
});
