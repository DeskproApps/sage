import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { LinkContact } from "../LinkContact";
import type { Props } from "../LinkContact";

const renderLinkContact = (props?: Partial<Props>) => render((
  <LinkContact
    onChangeSearch={props?.onChangeSearch || jest.fn()}
    selectedContact={props?.selectedContact || null}
    isSubmitting={props?.isSubmitting || false}
    onLinkContact={props?.onLinkContact || jest.fn()}
    isLoading={props?.isLoading || false}
    contacts={props?.contacts || []}
    onChangeSelectedContact={props?.onChangeSelectedContact || jest.fn()}
    onNavigateToCreate={props?.onNavigateToCreate || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"Create Contact\" page", async () => {
    const mockOnNavigateToCreate = jest.fn();
    const { findByRole } = renderLinkContact({
      onNavigateToCreate: mockOnNavigateToCreate,
    });
    const createButton = await findByRole("button", { name: "Create Contact" });

    await userEvent.click(createButton);

    expect(mockOnNavigateToCreate).toHaveBeenCalled();
  });
});
