import { cleanup } from "@testing-library/react";
import { render, mockSalesQuotes } from "../../../../../testing";
import { Info } from "../Info";
import type { Props } from "../Info";

const renderInfo = (props?: Partial<Props>) => render((
  <Info
    quote={props?.quote || mockSalesQuotes.$items[0] as never}
  />
), { wrappers: { theme: true } });

describe("ViewSalesQuote", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderInfo();

      expect(await findByText(/Deskpro BV Customer/i)).toBeInTheDocument();
      expect(await findByText(/DP-002/i)).toBeInTheDocument();
      expect(await findByText(/Pending/i)).toBeInTheDocument();
      expect(await findByText(/15 Oct, 2023/i)).toBeInTheDocument();
      expect(await findByText(/14 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Terms and ConditionsTerms and ConditionsTerms and Conditions/i)).toBeInTheDocument();
      expect(await findByText(/Notes Notes Notes Notes Notes Notes/i)).toBeInTheDocument();
    });
  });
});
