import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { getEntityListService, deleteEntityService } from "../../services/deskpro";
import { useUnlinkContact } from "../useUnlinkContact";
import type { Result } from "../useUnlinkContact";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/deskpro/deleteEntityService");


describe("useUnlinkContact", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should unlink contact", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["001"]);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderHook<Result, unknown>(() => useUnlinkContact());

    await act(async () => {
      await result.current.unlink();
    });

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/contact/link");
  });

  test("should navigate to \"/contact/link\" even if no contact linked", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderHook<Result, unknown>(() => useUnlinkContact());

    await act(async () => {
      await result.current.unlink();
    });

    expect(deleteEntityService).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/contact/link");
  });

  test("shouldn't navigate to \"/contact/link\" if unlink contact failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["001"]);
    (deleteEntityService as jest.Mock).mockRejectedValueOnce("unlink failed");

    const { result } = renderHook<Result, unknown>(() => useUnlinkContact());

    try {
      await act(async () => {
        await result.current.unlink();
      });
    } catch (e) {
      expect(deleteEntityService).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalledWith("/contact/link");
    }
  });
});
