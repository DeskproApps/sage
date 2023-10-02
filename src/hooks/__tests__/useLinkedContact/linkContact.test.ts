import { cleanup, renderHook, act } from "@testing-library/react";
import { wrap } from "../../../../testing";
import {
  setEntityService,
  deleteEntityService,
  getEntityListService,
} from "../../../services/deskpro";
import { useLinkedContact } from "../../useLinkedContact";
import type { Result } from "../../useLinkedContact";

const renderUseLinkedContact = () => renderHook<Result, unknown>(
  () => useLinkedContact(),
  {
    wrapper: ({ children }) => wrap(children, { query: true })
  },
);

jest.mock("../../../services/deskpro/setEntityService");
jest.mock("../../../services/deskpro/deleteEntityService");
jest.mock("../../../services/deskpro/getEntityListService");

describe("useLinkedCards", () => {
  describe("linkContact", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should deleted linked contact from deskpro user", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["001"]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);
      (setEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result: { current: { linkContact }}} = renderUseLinkedContact();

      await act(async () => {
        await linkContact("sage-contact-id-001");
      });

      expect(deleteEntityService).toHaveBeenCalledTimes(1);
    });

    test("should deleted all linked contacts to the deskpro user even if it's more then one", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["001", "002", "003"]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);
      (setEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result: { current: { linkContact }}} = renderUseLinkedContact();

      await act(async () => {
        await linkContact("sage-contact-id-001");
      });

      expect(deleteEntityService).toHaveBeenCalledTimes(3);
    });

    test("shouldn't sent deleteEntityService if no linked contact", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);
      (setEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result: { current: { linkContact }}} = renderUseLinkedContact();

      await act(async () => {
        await linkContact("sage-contact-id-001");
      });

      expect(deleteEntityService).not.toHaveBeenCalled();
    });

    test("should sent setEntityService to link the contact to the deskpro user", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce(["001"]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);
      (setEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result: { current: { linkContact }}} = renderUseLinkedContact();

      await act(async () => {
        await linkContact("sage-contact-id-001");
      });

      expect(setEntityService).toHaveBeenCalled();
    });

    test("should throw an error if no pass contactId", async () => {
      (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
      (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);
      (setEntityService as jest.Mock).mockResolvedValueOnce(undefined);

      const { result: { current: { linkContact }}} = renderUseLinkedContact();

      try {
        await act(async () => {
          await linkContact(undefined as never);
        });
      } catch (error) {
        expect((error as Error).message).toBe("No contact to be linked");
      }
    });
  });
});
