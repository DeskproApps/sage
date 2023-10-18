import { cleanup } from "@testing-library/react";
import { render, mockSalesQuotes } from "../../../../../testing";
import { TotalPrice } from "../TotalPrice";
import type { Props } from "../TotalPrice";

const renderPrice = (props?: Partial<Props>) => render((
  <TotalPrice
    currency={props?.currency || "GBP"}
    quote={props?.quote || mockSalesQuotes.$items[0] as never}
  />
), { wrappers: { theme: true } });

describe("ViewSalesQuote", () => {
  describe("TotalPrice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderPrice();

      expect(await findByText(/Total Net/i)).toBeInTheDocument();
      expect(await findByText(/£6.00/i)).toBeInTheDocument();
      expect(await findByText(/VAT/i)).toBeInTheDocument();
      expect(await findByText(/\(Standard 20.00%\)/i)).toBeInTheDocument();
      expect(await findByText(/£1.20/i)).toBeInTheDocument();
      expect(await findAllByText(/Total/i)).toHaveLength(2);
      expect(await findByText(/£7.20/i)).toBeInTheDocument();
    });
  });
});
