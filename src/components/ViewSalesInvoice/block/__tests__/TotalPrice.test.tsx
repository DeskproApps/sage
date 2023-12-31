import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoice } from "../../../../../testing";
import { TotalPrice } from "../TotalPrice";
import type { Props } from "../TotalPrice";

const renderPrice = (props?: Partial<Props>) => render((
  <TotalPrice
    currency={props?.currency || "GBP"}
    invoice={props?.invoice || mockSalesInvoice as never}
  />
), { wrappers: { theme: true } });

describe("ViewSalesInvoice", () => {
  describe("TotalPrice", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderPrice();

      expect(await findByText(/Total Net/i)).toBeInTheDocument();
      expect(await findByText(/5,009.50/i)).toBeInTheDocument();

      expect(await findByText(/discount/i)).toBeInTheDocument();
      expect(await findByText(/3.00/i)).toBeInTheDocument();

      expect(await findByText(/VAT/i)).toBeInTheDocument();
      expect(await findByText(/1,001\.90/i)).toBeInTheDocument();

      expect(await findAllByText(/Total/i)).toHaveLength(2);
      expect(await findByText(/6,011\.40/i)).toBeInTheDocument();
    });
  });
});
