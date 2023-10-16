import { generateErrorMessage } from "../getErrors";

describe("ContactForm", () => {
  describe("generateErrorMessage", () => {
    test("should return full error message", () => {
      expect(generateErrorMessage({
        $dataCode: "RecordInvalid",
        $message: "must be unique.",
        $severity: "error",
        $source: "reference",
      })).toBe("reference: must be unique.");
    });

    test("should return full error message", () => {
      expect(generateErrorMessage({
        $dataCode: "RecordInvalid",
        $message: "must be unique.",
        $severity: "error",
        $source: "",
      })).toBe("must be unique.");
    });

    test("should return default error message", () => {
      expect(generateErrorMessage({
        $dataCode: "RecordInvalid",
        $message: "",
        $severity: "error",
        $source: "",
      })).toBe("There was an error!");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}, []]
    )("wrong value: %p", (value) => {
      expect(generateErrorMessage(value as never)).toBe("There was an error!");
    });
  });
});
