import { cleanup, renderHook, act } from "@testing-library/react";
import { wrap, mockContactsEmpty, mockContactsAdditional, mockContacts } from "../../../../testing";
import { useLinkedContact } from "../../useLinkedContact";
import { getEntityListService } from "../../../services/deskpro";
import { getContactsService } from "../../../services/sage";
import type { Result } from "../../useLinkedContact";

const renderUseLinkedContact = () => renderHook<Result, unknown>(
  () => useLinkedContact(),
  {
    wrapper: ({ children }) => wrap(children, { query: true })
  },
);

jest.mock("../../../services/deskpro/getEntityListService");
jest.mock("../../../services/sage/getContactsService");


describe("useLinkedCards", () => {
  describe("findContact", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should return contactId id if contact is linked", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["contact-001"]);
      (getContactsService as jest.Mock).mockResolvedValueOnce(mockContactsEmpty);

      let contactId;
      const { result: { current: { findContact }}} = renderUseLinkedContact();

      await act(async () => {
        contactId = await findContact();
      });

      expect(contactId).toEqual("contact-001");
    });

    test("should find contact by primary email if contact no linked", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
      (getContactsService as jest.Mock)
        .mockResolvedValueOnce(mockContactsAdditional)
        .mockResolvedValue(mockContactsEmpty);

      let contactId;
      const { result: { current: { findContact }}} = renderUseLinkedContact();

      await act(async () => {
        contactId = await findContact();
      });

      expect(contactId).toEqual("8dd3cacd5d14441cadf7dad7a56903fc");
    });

    test("should find contact by emails if contact no linked and don't find by primary email", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
      (getContactsService as jest.Mock)
        .mockResolvedValueOnce(mockContacts)
        .mockResolvedValue(mockContactsEmpty);

      let contactId;
      const { result: { current: { findContact }}} = renderUseLinkedContact();

      await act(async () => {
        contactId = await findContact();
      });

      expect(contactId).toEqual("6ba85bcca57148eebb5ec563dba84753");
    });

    test("shouldn't return contactId if no found", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
      (getContactsService as jest.Mock).mockResolvedValue(mockContactsEmpty);

      let contactId;
      const { result: { current: { findContact }}} = renderUseLinkedContact();

      await act(async () => {
        contactId = await findContact();
      });

      expect(contactId).toBeUndefined();
    });
  });
});
