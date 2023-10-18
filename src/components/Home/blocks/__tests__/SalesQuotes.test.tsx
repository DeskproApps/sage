import { cleanup } from "@testing-library/react";
import { render, mockSalesQuotes } from "../../../../../testing";
import { SalesQuotes } from "../SalesQuotes";
import type { Props } from "../SalesQuotes";

const renderSalesQuotes = (props?: Partial<Props>) => render((
  <SalesQuotes
    quotes={props?.quotes || mockSalesQuotes.$items as never[]}
    newSalesQuoteLink={props?.newSalesQuoteLink || "https://sage.test/sales-quotes/new?contact_id=123"}
    onNavigateToSalesQuotes={props?.onNavigateToSalesQuotes || jest.fn()}
  />
), { wrappers: { theme: true, router: true } });

describe("SalesQuotes", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesQuotes();

    expect(await findByText(/Sales Quotes \(1\)/i)).toBeInTheDocument();
    expect(await findByText(/SQ-2/i)).toBeInTheDocument();
  });

  test.todo("should navigate to SalesQuotes page");
});
