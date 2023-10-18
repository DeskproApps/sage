import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockSalesEstimates } from "../../../../../testing";
import { SalesEstimates } from "../SalesEstimates";
import type { Props } from "../SalesEstimates";

const renderSalesEstimates = (props?: Partial<Props>) => render((
  <SalesEstimates
    estimates={props?.estimates || mockSalesEstimates.$items as never[]}
    newSalesEstimateLink={props?.newSalesEstimateLink || "https://sage.test/sales-estimates/new?contact_id=123"}
    onNavigateToSalesEstimates={props?.onNavigateToSalesEstimates || jest.fn()}
  />
), { wrappers: { theme: true, router: true } });

describe("SalesEstimates", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSalesEstimates();

    expect(await findByText(/Sales Estimates \(1\)/i)).toBeInTheDocument();
    expect(await findByText(/SE-1/i)).toBeInTheDocument();
  });

  test("should navigate to SalesEstimates page", async () => {
    const mockOnNavigate = jest.fn();

    const { findByRole } = renderSalesEstimates({
      onNavigateToSalesEstimates: mockOnNavigate,
    });
    const link = await findByRole("link", { name: /Sales Estimates/i });

    await userEvent.click(link);

    expect(mockOnNavigate).toHaveBeenCalled();
  });
});
