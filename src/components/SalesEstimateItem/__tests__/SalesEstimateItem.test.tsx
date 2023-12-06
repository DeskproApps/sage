import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockSalesEstimates } from "../../../../testing";
import { SalesEstimateItem } from "../SalesEstimateItem";
import type { Props } from "../SalesEstimateItem";

const renderSalesEstimateItem = (props?: Partial<Props>) => render((
  <SalesEstimateItem
    isLast
    estimate={props?.estimate || mockSalesEstimates.$items[0] as never}
  />
), { wrappers: { theme: true, router: "/home" } });

describe("SalesEstimateItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesEstimateItem();

    expect(await findByText(/SE-1/i)).toBeInTheDocument();
    expect(await findByText(/DP-002/i)).toBeInTheDocument();
    expect(await findByText(/Pending/i)).toBeInTheDocument();
    expect(await findByText(/17 Oct, 2023/i)).toBeInTheDocument();
    expect(await findByText(/16 Nov, 2023/i)).toBeInTheDocument();
  });

  test("should navigate to sales estimate details page", async () => {
    const { findByRole } = renderSalesEstimateItem();
    const titleLink = await findByRole("link", { name: /SE-1/i });

    expect(window.location.hash).toBe("#/home");

    await userEvent.click(titleLink);

    expect(window.location.hash).toBe("#/sales-estimates/c6086d377c8b482da7fc44ab6d8097c3");
  });
});
