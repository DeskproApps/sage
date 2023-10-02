import { getContactType } from "../getContactType";

const mockSupplier = {
  id: "VENDOR",
  displayed_as: "Supplier",
  $path: "/contact_types/VENDOR",
};

const mockCustomer = {
  "id": "CUSTOMER",
  "displayed_as": "Customer",
  "$path": "/contact_types/CUSTOMER",
};

describe("getContactType", () => {
  test("should return Customer", () => {
    expect(getContactType(mockCustomer)).toBe("Customer");
    expect(getContactType([mockCustomer])).toBe("Customer");
  });

  test("should return Supplier", () => {
    expect(getContactType(mockSupplier)).toBe("Supplier");
    expect(getContactType([mockSupplier])).toBe("Supplier");
  });

  test.each(
    [undefined, null, "", 0, true, false, {}, []]
  )("wrong value: %p", (value) => {
    expect(getContactType(value)).toBeUndefined();
  });
});
