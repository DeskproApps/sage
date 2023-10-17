import { cleanup } from "@testing-library/react";
import { render, mockPurchaseInvoices } from "../../../../../testing";
import { Info } from "../Info";
import type { Props } from "../Info";

const renderInfo = (props?: Partial<Props>) => render((
  <Info invoice={props?.invoice || mockPurchaseInvoices.$items[0] as never} />
), { wrappers: { theme: true } });

describe("ViewPurchaseInvoice", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderInfo();

      expect(await findByText(/Deskpro LTD Supplier/i)).toBeInTheDocument();
      expect(await findByText(/DP-001/i)).toBeInTheDocument();
      expect(await findByText(/Unpaid/i)).toBeInTheDocument();
      expect(await findByText(/16 Oct, 2023/i)).toBeInTheDocument();
      expect(await findByText(/30 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Notes Notes Notes Notes Notes Notes Notes/i)).toBeInTheDocument();
    });
  });
});
