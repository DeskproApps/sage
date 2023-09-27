import { getSageLink } from "../getSageLink";

const mockLinks = [
  { href:"https://html.url", type:"text/html" },
  { href:"https://audio.url", type:"audio/ogg" },
  { href:"https://image.url", type:"image/png" },
];

describe("getSageLink", () => {
  test("should return url", () => {
    expect(getSageLink(mockLinks)).toEqual("https://html.url");
  });

  test.each([undefined, null, "", 0, true, false, {}, []])("wrong value: %p", (value) => {
    expect(getSageLink(value as never)).toBeUndefined();
  });
});
