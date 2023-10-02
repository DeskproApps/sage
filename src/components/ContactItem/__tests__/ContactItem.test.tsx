import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockContact, mockContactsAdditional } from "../../../../testing";
import { ContactItem } from "../ContactItem";
import type { Props } from "../ContactItem";

const renderContactItem = (props?: Partial<Props>) => render((
  <ContactItem
    contact={props?.contact || mockContact as never}
    onChangeSelectedContact={props?.onChangeSelectedContact || jest.fn()}
  />
), { wrappers: { theme: true } })

describe("ContactItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText, findByRole } = renderContactItem();

    expect(await findByRole("link", { name: /HMRC Payments \(HMRC Pay\)/i })).toBeInTheDocument();
    expect(await findByText(/cormac.mccarthy@example.org/i)).toBeInTheDocument();
  });

  test("shouldn't show email if isn't exist", async () => {
    const { findByText } = renderContactItem({ contact: mockContactsAdditional.$items[0] as never });

    expect(await findByText(/Macolm Hall Associates \(MAC001\)/i)).toBeInTheDocument();
    expect(await findByText(/-/i)).toBeInTheDocument();
  });

  test("should trigger onChangeSelectedContact", async () => {
    const mockOnChange = jest.fn();
    const { findByRole } = renderContactItem({ onChangeSelectedContact: mockOnChange });

    const title = await findByRole("link", { name: /HMRC Payments \(HMRC Pay\)/i });
    await userEvent.click(title);

    expect(mockOnChange).toBeCalled();
  });
});
