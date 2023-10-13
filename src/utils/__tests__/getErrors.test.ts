import { getErrors } from "../getErrors";

const error1 = {
  $dataCode: "RecordInvalid",
  $message: "must be unique.",
  $severity: "error",
  $source: "reference",
};

const error2 = {
  $severity: "error",
  $dataCode: "Validation",
  $message: "contact is missing",
  $source: "contact"
};

const errorEmpty = {};

describe("getErrors", () => {
  test("should return error", () => {
    expect(getErrors(error1 as never)).toEqual(["reference: must be unique."]);
  });

  test("should return list of errors", () => {
    expect(getErrors([error1, error2] as never[]))
      .toEqual(["reference: must be unique.", "contact: contact is missing"]);
  });

  test("should return default error", () => {
    expect(getErrors(new Error("some error") as never)).toEqual(["There was an error!"]);
  });

  test("should return only unique errors", () => {
    expect(getErrors([error1, errorEmpty, error2, errorEmpty, errorEmpty] as never[]))
      .toEqual([
        "reference: must be unique.",
        "There was an error!",
        "contact: contact is missing",
      ]);
  });
});
