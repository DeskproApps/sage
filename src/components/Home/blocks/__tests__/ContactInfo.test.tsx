import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockContactCustomer } from "../../../../../testing";
import { ContactInfo } from "../ContactInfo";
import type { Props } from "../ContactInfo";

const renderContactInfo = (props?: Partial<Props>) => render((
  <ContactInfo
    contact={props?.contact || mockContactCustomer as never}
  />
), { wrappers: { theme: true, router: "/home" } });

describe("ContactInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText,findAllByText } = renderContactInfo();

    expect(await findByText(/Deskpro BV Customer/i)).toBeInTheDocument();
    expect(await findByText(/Reference/i)).toBeInTheDocument()
    expect(await findByText(/DP-002/i)).toBeInTheDocument()
    expect(await findByText(/Type/i)).toBeInTheDocument();
    expect(await findAllByText(/Customer/i)).toHaveLength(2);
    expect(await findByText(/Primary Person/i)).toBeInTheDocument();
    expect(await findByText(/Dorcas McCullough/i)).toBeInTheDocument();
    expect(await findByText(/Primary Email/i)).toBeInTheDocument();
    expect(await findByText(/beatty.irving@example.org/i)).toBeInTheDocument();
  });

  test("should navigate to contact details page", async () => {
    const { findByRole } = renderContactInfo();

    const titleLink = await findByRole("link", { name: /Deskpro BV Customer/i });

    expect(window.location.hash).toBe("#/home");

    await userEvent.click(titleLink);

    expect(window.location.hash).toBe("#/contact/view/be4de860ee2c447288cc31385ffa9d73");
  });
});
