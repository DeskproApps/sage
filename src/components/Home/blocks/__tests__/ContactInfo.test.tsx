import { cleanup } from "@testing-library/react";
import { render, mockContact } from "../../../../../testing";
import { ContactInfo } from "../ContactInfo";
import type { Props } from "../ContactInfo";

const renderContactInfo = (props?: Partial<Props>) => render((
  <ContactInfo contact={props?.contact || mockContact as never} />
), { wrappers: { theme: true } });

describe("CreateCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderContactInfo();

    expect(await findByText(/Primary Person/i)).toBeInTheDocument();
    expect(await findByText(/Cormac McCarthy/i)).toBeInTheDocument();
    expect(await findByText(/Primary Email/i)).toBeInTheDocument();
    expect(await findByText(/cormac.mccarthy@example.org/i)).toBeInTheDocument();
  });

  test.todo("should navigate to contact details page");
});
