import { getEntityMetadata } from "../getEntityMetadata";
import { mockContactCustomer, mockContactSupplier } from "../../../testing";

describe("getEntityMetadata", () => {
  test("should return meta data for customer", () => {
    expect(getEntityMetadata(mockContactCustomer as never))
      .toStrictEqual({
        id: "be4de860ee2c447288cc31385ffa9d73",
        contact: "Deskpro BV Customer",
        contactType: "Customer",
        personPrimary: "Dorcas McCullough",
        personEmail: "beatty.irving@example.org",
      });
  });

  test("should return meta data for supplier", () => {
    expect(getEntityMetadata(mockContactSupplier as never))
      .toStrictEqual({
        id: "a8022ec756c14f999f928192bba93e57",
        contact: "Deskpro LTD Supplier",
        contactType: "Supplier",
        personPrimary: "Armen Tamzarian",
        personEmail: "hello@deskpro.com",
      });
  });

  test("should return undefined if contact is empty", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
