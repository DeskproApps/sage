import { cleanup } from "@testing-library/react";
import { render, mockSalesEstimates } from "../../../../testing";
import { SalesEstimates } from "../SalesEstimates";
import type { Props } from "../SalesEstimates";

const renderSalesEstimates = (props?: Partial<Props>) => render((
  <SalesEstimates
    estimates={props?.estimates || mockSalesEstimates.$items as never[]}
    newSalesEstimateLink={props?.newSalesEstimateLink || "https://sage.test/sales-estimates/new?contact_id=123"}
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

  test("should show no found", async () => {
    const { findByText } = renderSalesEstimates({ estimates: [] });

    expect(await findByText(/Sales Estimates \(0\)/i)).toBeInTheDocument();
    expect(await findByText(/No Sales Estimates found/i)).toBeInTheDocument();
  });
});
