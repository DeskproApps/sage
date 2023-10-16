import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { wrap } from "../../../../testing";
import { getEntityListService} from "../../../services/deskpro";
import { useContactId } from "../hooks";
import type { Result } from "../hooks";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../../services/deskpro/getEntityListService");

const renderUseContactId = () => renderHook<Result, unknown>(
  () => useContactId(),
  { wrapper: ({ children }) => wrap(children, { query: true, router: true }) },
);

describe("useContactId", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return contactId", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["001"]);

    const { result } = renderUseContactId();

    await waitFor(() => {
      expect(result.current.contactId).toBe("001");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
  test("should redirect to /no-found id no linked contact", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce([]);

    renderUseContactId();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/no-linked");
    });
  });
});
