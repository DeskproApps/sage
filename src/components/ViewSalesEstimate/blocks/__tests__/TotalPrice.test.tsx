import { cleanup } from "@testing-library/react";
import { render, mockSalesEstimates } from "../../../../../testing";
import { TotalPrice } from "../TotalPrice";
import type { Props } from "../TotalPrice";

const renderPrice = (props?: Partial<Props>) => render((
  <TotalPrice
    currency={props?.currency || "GBP"}
    estimate={props?.estimate || mockSalesEstimates.$items[0] as never}
  />
), { wrappers: { theme: true } });

describe("ViewSalesEstimate", () => {
  describe("TotalPrice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderPrice();

      expect(await findByText(/Total Net/i)).toBeInTheDocument();
      expect(await findByText(/£7.50/i)).toBeInTheDocument();
      expect(await findByText(/VAT/i)).toBeInTheDocument();
      expect(await findByText(/\(Standard 20.00%\)/i)).toBeInTheDocument();
      expect(await findByText(/£1.50/i)).toBeInTheDocument();
      expect(await findAllByText(/Total/i)).toHaveLength(2);
      expect(await findByText(/£9.00/i)).toBeInTheDocument();
    });
  });
});
