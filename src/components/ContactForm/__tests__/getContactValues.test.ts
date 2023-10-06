import pick from "lodash/pick";
import { getContactValues } from "../utils";
import values from "./mockValues.json";

describe("ContactForm", () => {
  describe("getContactValues", () => {
    test("should return required values", () => {
      const data = getContactValues(pick(values, ["name", "contact_type", "reference"]));

      expect(data).toStrictEqual({
        name: "Test Contact",
        contact_type_ids: ["CUSTOMER"],
        reference: "TEST-001",
        main_contact_person:  {
          name: "",
          email: "",
          telephone: "",
          mobile: "",
          fax: "",
        },
        main_address: {
          name: "",
          address_line_1: "",
          city: "",
          country_id: "",
          postal_code: "",
          is_main_address: true,
        },
      });
    });

    test("should return full card values", () => {
      expect(getContactValues(values)).toStrictEqual({
        name: "Test Contact",
        contact_type_ids: ["CUSTOMER"],
        reference: "TEST-001",
        main_contact_person:  {
          name: "Armen Tamzarian",
          email: "armen.tamzarian@me.com",
          telephone: "+380505555555",
          mobile: "+380505555577",
          fax: "+380505555599"
        },
        main_address: {
          name: "My-own",
          address_line_1: "Shevchenko, 1",
          city: "Lviv",
          country_id: "UA",
          postal_code: "62002",
          is_main_address: true,
        },
      });
    });

    test("should return required values with contact person", () => {
      const data = getContactValues(
        pick(values, ["name", "contact_type", "reference", "person_name", "person_mobile"]),
      );

      expect(data).toStrictEqual({
        name: "Test Contact",
        contact_type_ids: ["CUSTOMER"],
        reference: "TEST-001",
        main_contact_person: {
          name: "Armen Tamzarian",
          mobile: "+380505555577",
          email: "",
          telephone: "",
          fax: "",
        },
        main_address: {
          name: "",
          address_line_1: "",
          city: "",
          country_id: "",
          postal_code: "",
          is_main_address: true,
        },
      });
    });

    test("should return required values with address", () => {
      const data = getContactValues(
        pick(values, ["name", "contact_type", "reference", "address_line_1", "address_country_id"]),
      );

      expect(data).toStrictEqual({
        name: "Test Contact",
        contact_type_ids: ["CUSTOMER"],
        reference: "TEST-001",
        main_contact_person: {
          name: "",
          mobile: "",
          email: "",
          telephone: "",
          fax: "",
        },
        main_address: {
          name: "",
          address_line_1: "Shevchenko, 1",
          city: "",
          country_id: "UA",
          postal_code: "",
          is_main_address: true,
        },
      });
    });
  });
});
