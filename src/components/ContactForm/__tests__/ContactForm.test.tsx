import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockContactTypes } from "../../../../testing";
import {
  getCountriesService,
  getContactTypesService,
} from "../../../services/sage";
import { ContactForm } from "../ContactForm";
import type { Props } from "../types";

jest.mock("../../../services/sage/getCountriesService");
jest.mock("../../../services/sage/getContactTypesService");

const renderContactForm = (props?: Partial<Props>) => render((
  <ContactForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
    contact={props?.contact || undefined}
  />
), { wrappers: { theme: true, query: true } });

describe("ContactItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue([]);

    const { findByText, findAllByText } = renderContactForm();

    expect(await findAllByText(/Name/i)).toHaveLength(3);
    expect(await findByText(/Type/i)).toBeInTheDocument();
    expect(await findByText(/Reference/i)).toBeInTheDocument();
    expect(await findByText(/Primary Person/i)).toBeInTheDocument();
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(await findByText(/Telephone/i)).toBeInTheDocument();
    expect(await findByText(/Mobile/i)).toBeInTheDocument();
    expect(await findByText(/Fax/i)).toBeInTheDocument();
    expect(await findByText(/Main Addres/i)).toBeInTheDocument();
    expect(await findByText(/Address Name/i)).toBeInTheDocument();
    expect(await findAllByText(/Address/i)).toHaveLength(2);
    expect(await findByText(/City/i)).toBeInTheDocument();
    expect(await findByText(/Country/i)).toBeInTheDocument();
    expect(await findByText(/Postal Code/i)).toBeInTheDocument();
  });

  test("should show \"Create\" button", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue([]);

    const { findByRole } = renderContactForm();
    const createButton = await findByRole("button", { name: "Create" });

    expect(createButton).toBeInTheDocument();
  });

  test("should show \"Save\" button", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue([]);

    const { findByRole } = renderContactForm({ isEditMode: true });
    const saveButton = await findByRole("button", { name: "Save" });

    expect(saveButton).toBeInTheDocument();
  });

  test("render error", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue([]);

    const { findByText } = renderContactForm({ error: "some error" });
    expect(await findByText(/some error/)).toBeInTheDocument();
  });

  test("shouldn't submit if empty form", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue([]);

    const mockOnSubmit = jest.fn();
    const { findByRole } = renderContactForm({ onSubmit: mockOnSubmit });

    const createButton = await findByRole("button", { name: "Create" });
    await userEvent.click(createButton);

    expect(mockOnSubmit).not.toBeCalled();
  });

  test("should submit if filled required fields", async () => {
    (getCountriesService as jest.Mock).mockResolvedValue([]);
    (getContactTypesService as jest.Mock).mockResolvedValue(mockContactTypes);

    const mockOnSubmit = jest.fn();
    const { findByRole } = renderContactForm({
      onSubmit: mockOnSubmit,
      contact: {
        name: "Deskpro BV Customer",
        reference: "DP-002",
        contact_types: [{ id: "CUSTOMER" }],
      } as never,
    });

    const createButton = await findByRole("button", { name: "Create" });

    await userEvent.click(createButton);

    expect(mockOnSubmit).toBeCalled();
  });
});
