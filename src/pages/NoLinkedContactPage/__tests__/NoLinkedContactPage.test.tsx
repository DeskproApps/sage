import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { NoLinkedContactPage } from "../NoLinkedContactPage";

describe("ContactItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <NoLinkedContactPage />
    ) , { wrappers: { theme: true } });

    expect(await findByText(/No contact linked/i)).toBeInTheDocument();
    expect(await findByText(/Contact must be linked to the Deskpro user/i)).toBeInTheDocument();
  });
});
