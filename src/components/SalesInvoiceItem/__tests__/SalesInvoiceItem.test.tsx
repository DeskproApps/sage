import { SalesInvoiceItem } from "../SalesInvoiceItem";
import { mockSalesInvoices, render } from "../../../../testing";
import type { Props } from "../SalesInvoiceItem";

const renderSalesInvoiceItem = (props?: Partial<Props>) => render((
  <SalesInvoiceItem
    isLast={false}
    invoice={props?.invoice || mockSalesInvoices.$items[0] as never}
  />
), { wrappers: { theme: true, router: true } });

describe("SalesInvoiceItem", () => {
  test("render", async () => {
    const { findByText } = renderSalesInvoiceItem();

    expect(await findByText(/SI-2/i)).toBeInTheDocument();
    expect(await findByText(/DST001/i)).toBeInTheDocument();
    expect(await findByText(/Unpaid/i)).toBeInTheDocument();
    expect(await findByText(/29 Sep, 2023/i)).toBeInTheDocument();
    expect(await findByText(/29 Oct, 2023/i)).toBeInTheDocument();
  });
});
