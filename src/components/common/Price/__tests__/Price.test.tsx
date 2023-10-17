import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { Price } from "../Price";
import type { Props } from "../Price";

const renderPrice = (props?: Partial<Props>) => render((
  <Price
    currency={props?.currency || "GBP"}
    price={props?.price || 0}
    label={props?.label || "Total"}
    description={props?.description || ""}
  />
), { wrappers: { theme: true } });

describe("Price", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderPrice();
    expect(await findByText(/Total/i)).toBeInTheDocument();
    expect(await findByText(/0/i)).toBeInTheDocument();
  });

  test("should render price", async () => {
    const { findByText } = renderPrice({ price: "23.5" });
    expect(await findByText(/Total/i)).toBeInTheDocument();
    expect(await findByText(/£23\.50/i)).toBeInTheDocument();
  });

  test("should render description", async () => {
    const { findByText } = renderPrice({ price: "25", label: "VAT", description: "(Standard 20.00%)" });
    expect(await findByText(/VAT/i)).toBeInTheDocument();
    expect(await findByText(/£25\.00/i)).toBeInTheDocument();
    expect(await findByText(/\(Standard 20.00%\)/i)).toBeInTheDocument();
  });

  test("should render currency", async () => {
    const { findByText } = renderPrice({ price: "25", currency: "UAH" });
    expect(await findByText(/₴25\.00/i)).toBeInTheDocument();
  });
});
