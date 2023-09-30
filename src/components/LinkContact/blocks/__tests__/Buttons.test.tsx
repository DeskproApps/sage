import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Buttons } from "../Buttons";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    selectedContact={props?.selectedContact || null}
    isSubmitting={props?.isSubmitting || false}
    onLinkContact={props?.onLinkContact || jest.fn()}
    onCancel={props?.onCancel}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons({ onCancel: jest.fn() });

      const linkButton = await findByRole("button", { name: "Link Contact" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("shouldn't render \"Cancel\" button", async () => {
      const { queryByRole } = renderButtons();
      const cancelButton = queryByRole("button", { name: "Cancel" });

      expect(cancelButton).toBeNull();
    });

    test("should click \"link cards\"", async () => {
      const mockOnLinkContact = jest.fn();
      const { findByRole } = renderButtons({ onLinkContact: mockOnLinkContact });
      const linkButton = await findByRole("button", { name: "Link Contact" });

      await userEvent.click(linkButton as Element);

      waitFor(() => {
        expect(mockOnLinkContact).toBeCalledTimes(1);
      });
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();
      const { findByRole } = renderButtons({ onCancel: mockOnCancel });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      waitFor(() => {
        expect(mockOnCancel).toBeCalledTimes(1);
      });
    });
  });
});
