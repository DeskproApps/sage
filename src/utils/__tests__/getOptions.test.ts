import { getOptions } from "../getOptions";

describe("getOptions", () => {
  test.todo("should return options");

  test.each(
    [undefined, null, "", 0, true, false, {}],
  )("wrong value: %p", (value) => {
    expect(getOptions(value as never)).toStrictEqual([]);
  });
});
