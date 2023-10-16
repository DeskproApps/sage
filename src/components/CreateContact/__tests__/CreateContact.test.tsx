import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { CreateContact } from "../CreateContact";
import type { Props } from "../CreateContact";

const renderCreateContact = (props?: Partial<Props>) => render((
  <CreateContact
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    onNavigateToLink={props?.onNavigateToLink || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
    contact={props?.contact}
  />
), { wrappers: { theme: true, query: true } });

describe("CreateContact", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"link contact\" page", async () => {
    const mockOnNavigateToLink = jest.fn();
    const { findByRole } = renderCreateContact({ onNavigateToLink: mockOnNavigateToLink });
    const findButton = await findByRole("button", { name: "Find Contact" });

    await userEvent.click(findButton);

    expect(mockOnNavigateToLink).toHaveBeenCalled();
  });
});

