import { cleanup } from "@testing-library/react";
import { render, mockContactCustomer, mockContactSupplier } from "../../../../testing";
import { ViewContact } from "../ViewContact";
import type { Props } from "../ViewContact";

const renderViewContact = (props?: Partial<Props>) => render((
  <ViewContact
    contact={props?.contact || mockContactCustomer as never}
  />
), { wrappers: { theme: true } });

describe("ContactItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render customer", async () => {
    const { findByText, findAllByText } = renderViewContact();

    expect(await findByText(/Deskpro BV Customer/i)).toBeInTheDocument();
    expect(await findByText(/DP-002/i)).toBeInTheDocument();
    expect(await findAllByText(/Customer/i)).toHaveLength(2);
    expect(await findByText(/Dorcas McCullough/i)).toBeInTheDocument();
    expect(await findByText(/beatty.irving@example.org/i)).toBeInTheDocument();
    expect(await findByText(/\+44 2035 111111/i)).toBeInTheDocument();
    expect(await findByText(/\+44 2035 222222/i)).toBeInTheDocument();
    expect(await findByText(/\+44 2035 333333/i)).toBeInTheDocument();
    /* Address */
    expect(await findByText(/Unit 12/i)).toBeInTheDocument();
    expect(await findByText(/Corporation Buildings/i)).toBeInTheDocument();
    expect(await findByText(/North Shields/i)).toBeInTheDocument();
    expect(await findByText(/North Tyneside/i)).toBeInTheDocument();
    expect(await findByText(/NE12 6GH/i)).toBeInTheDocument();
  });

  test("render supplier", async () => {
    const { findByText, findAllByText } = renderViewContact({ contact: mockContactSupplier as never });

    expect(await findByText(/Deskpro LTD Supplier/i)).toBeInTheDocument();
    expect(await findByText(/DP-001/i)).toBeInTheDocument();
    expect(await findAllByText(/Supplier/i)).toHaveLength(2);
    expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
    expect(await findByText(/hello@deskpro.com/i)).toBeInTheDocument();
    expect(await findByText(/\+44 2035 821980/i)).toBeInTheDocument();
    /* Address */
    expect(await findByText(/79 Hartfield Rd/i)).toBeInTheDocument();
    expect(await findByText(/London/i)).toBeInTheDocument();
    expect(await findByText(/United Kingdom/i)).toBeInTheDocument();
    expect(await findByText(/SW19 3ES/i)).toBeInTheDocument();
  });
});
