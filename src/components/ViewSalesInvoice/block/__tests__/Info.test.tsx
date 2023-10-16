import { cleanup } from "@testing-library/react";
import { render, mockSalesInvoice } from "../../../../../testing";
import { Info } from "../Info";
import type { Props } from "../Info";

const renderInfo = (props?: Partial<Props>) => render((
  <Info invoice={props?.invoice || mockSalesInvoice as never} />
), { wrappers: { theme: true } });

describe("ViewSalesInvoice", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderInfo();

      expect(await findByText(/Deskpro BV Customer/i)).toBeInTheDocument();
      expect(await findByText(/DP-002/i)).toBeInTheDocument();
      expect(await findByText(/Unpaid/i)).toBeInTheDocument();
      expect(await findByText(/29 Sep, 2023/i)).toBeInTheDocument();
      expect(await findByText(/29 Oct, 2023/i)).toBeInTheDocument();
      expect(await findByText(/this is Terms and Conditions/i)).toBeInTheDocument();
      expect(await findByText(/This is Notes Notes Notes Notes Notes Notes/i)).toBeInTheDocument();
    });
  });
});
