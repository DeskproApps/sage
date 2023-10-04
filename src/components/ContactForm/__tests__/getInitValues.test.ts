import { getInitValues } from "../utils";

describe("ContactForm", () => {
  describe("getInitValues", () => {
    test("should return init values for new contact", () => {
      expect(getInitValues()).toStrictEqual({
        name: "",
        contact_type: "",
        reference: "",
        person_name: "",
        person_email: "",
        person_telephone: "",
        person_mobile: "",
        person_fax: "",
        address_name: "",
        address_line_1: "",
        address_city: "",
        address_country_id: "",
        address_postal_code: "",
      });
    });

    test.todo("should return init values for edit card");
  });
});
