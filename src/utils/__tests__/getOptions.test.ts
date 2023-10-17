import { mockContacts } from "../../../testing";
import { getOptions } from "../getOptions";

describe("getOptions", () => {
  test("should return options", () => {
    expect(getOptions(mockContacts.$items)).toStrictEqual([
    {
      key: "6ba85bcca57148eebb5ec563dba84753",
      label: "Kinghorn & French (KIN001)",
      type: "value",
      value: "6ba85bcca57148eebb5ec563dba84753",
    },
    {
      key: "1cac14f87be34979aa7783038c023340",
      label: "HMRC Payments (HMRC Pay)",
      type: "value",
      value: "1cac14f87be34979aa7783038c023340",
    },
    {
      key: "e295e984de0946378ca776f5052c884f",
      label: "HMRC Reclaimed (HMRC Rec)",
      type: "value",
      value: "e295e984de0946378ca776f5052c884f",
    },
    ]);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}],
  )("wrong value: %p", (value) => {
    expect(getOptions(value as never)).toStrictEqual([]);
  });
});
