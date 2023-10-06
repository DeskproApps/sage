import cloneDeep from "lodash/cloneDeep";
import { getInitValues } from "../utils";
import { mockContactCustomer } from "../../../../testing";

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

    test("should return init values for edit card", () => {
      expect(getInitValues(mockContactCustomer as never)).toStrictEqual({
        name: "Deskpro BV Customer",
        contact_type: "CUSTOMER",
        reference: "DP-002",
        person_name: "Dorcas McCullough",
        person_email: "beatty.irving@example.org",
        person_telephone: "+44 2035 111111",
        person_mobile: "+44 2035 222222",
        person_fax: "+44 2035 333333",
        address_name: "Peter Quigley",
        address_line_1: "Unit 12",
        address_city: "North Shields",
        address_country_id: "GB",
        address_postal_code: "NE12 6GH",
      });
    });

    test("should return init values with partial data", () => {
      const mockContact = cloneDeep(mockContactCustomer);
      mockContact.reference = null as never;
      mockContact.main_address.address_line_1 = null as never;
      mockContact.main_contact_person.mobile = null as never;
      mockContact.main_contact_person.fax = null as never;

      expect(getInitValues(mockContact as never)).toStrictEqual({
        name: "Deskpro BV Customer",
        contact_type: "CUSTOMER",
        reference: "",
        person_name: "Dorcas McCullough",
        person_email: "beatty.irving@example.org",
        person_telephone: "+44 2035 111111",
        person_mobile: "",
        person_fax: "",
        address_name: "Peter Quigley",
        address_line_1: "",
        address_city: "North Shields",
        address_country_id: "GB",
        address_postal_code: "NE12 6GH",
      });
    });
  });
});
