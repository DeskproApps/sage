import { cleanup } from "@testing-library/react";
import { render, mockPurchaseInvoices } from "../../../../../testing";
import { TotalPrice } from "../TotalPrice";
import type { Props } from "../TotalPrice";

const renderTotalPrice = (props?: Partial<Props>) => render((
  <TotalPrice
    currency={props?.currency || "GBP"}
    invoice={props?.invoice || mockPurchaseInvoices.$items[0] as never}
  />
), { wrappers: { theme: true } });

describe("ViewPurchaseInvoice", () => {
  describe("TotalPrice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderTotalPrice();

      expect(await findByText(/Total Net/i)).toBeInTheDocument();
      expect(await findByText(/£7,565.00/i)).toBeInTheDocument();

      expect(await findByText(/VAT/i)).toBeInTheDocument();
      expect(await findByText(/\(Standard 20.00%\)/i)).toBeInTheDocument();
      expect(await findByText(/£1,513.00/i)).toBeInTheDocument();

      expect(await findAllByText(/Total/i)).toHaveLength(2);
      expect(await findByText(/£9,078.00/i)).toBeInTheDocument();
    });
  });
});
