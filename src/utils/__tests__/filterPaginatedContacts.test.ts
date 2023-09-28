import { filterPaginatedContacts } from "../filterPaginatedContacts";
import { mockContacts, mockContactsEmpty, mockContactsAdditional } from "../../../testing/mocks";

describe("filterPaginatedContacts", () => {
  test("should return contacts list", () => {
    expect(filterPaginatedContacts([mockContacts, mockContactsEmpty, mockContactsAdditional] as never))
      .toMatchObject([
        { id: "6ba85bcca57148eebb5ec563dba84753" },
        { id: "1cac14f87be34979aa7783038c023340" },
        { id: "e295e984de0946378ca776f5052c884f" },
        { id: "8dd3cacd5d14441cadf7dad7a56903fc" },
      ]);
  });

  test.each([undefined, null, "", 0, true, false, {}, []])("wrong value: %p", (value) => {
    expect(filterPaginatedContacts(value as never)).toEqual([]);
  });
});
