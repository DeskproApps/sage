import { getSageLink } from "../getSageLink";

const mockLinks = [
  { href:"https://html.url", rel: "alternate", type:"text/html" },
  { href:"https://audio.url", rel: "alternate", type:"audio/ogg" },
  { href:"https://image.url", rel: "alternate", type:"image/png" },
];

const mockInvoicesLinks = [
  { href: "https://sageone.com/online_payment/", rel: "bookmark", type: "text/html" },
  { href: "https:///sales_invoices/123", rel: "alternate", type: "text/html" },
];

describe("getSageLink", () => {
  test("should return url", () => {
    expect(getSageLink(mockLinks)).toEqual("https://html.url");
    expect(getSageLink(mockInvoicesLinks)).toEqual("https:///sales_invoices/123");
  });

  test.each([undefined, null, "", 0, true, false, {}, []])("wrong value: %p", (value) => {
    expect(getSageLink(value as never)).toBeUndefined();
  });
});
