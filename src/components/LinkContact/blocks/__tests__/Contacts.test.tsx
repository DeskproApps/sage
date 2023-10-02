import { cleanup } from "@testing-library/react";
import { render, mockContacts } from "../../../../../testing";
import { Contacts } from "../Contacts";
import type { Props } from "../Contacts";

const renderContacts = (props?: Partial<Props>) => render((
  <Contacts
    contacts={props?.contacts || []}
    onChangeSelectedContact={props?.onChangeSelectedContact || jest.fn()}
    selectContact={props?.selectContact || null}
    isLoading={props?.isLoading || false}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("Contacts", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderContacts({ contacts: mockContacts.$items as never });

      expect(await findByText(/Kinghorn & French/i)).toBeInTheDocument();
      expect(await findByText(/HMRC Payments/i)).toBeInTheDocument();
      expect(await findByText(/HMRC Reclaimed/i)).toBeInTheDocument();
    });

    test("should show \"No found\" id wrong contacts", async () => {
      const { findByText } = renderContacts({ contacts: {} as never });

      expect(await findByText(/No found/i)).toBeInTheDocument();
    });

    test("should show \"No Sage contacts found\" if no contacts", async () => {
      const { findByText } = renderContacts();

      expect(await findByText(/No Sage contacts found/i)).toBeInTheDocument();
    });
  });
});
