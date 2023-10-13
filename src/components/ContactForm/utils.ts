import get from "lodash/get";
import { z } from "zod";
import type { FormValidationSchema, ContactValues } from "./types";
import type { Contact } from "../../services/sage/types";

const validationSchema = z.object({
  name: z.string().min(1),
  contact_type: z.string().min(1),
  reference: z.string().optional(),
  person_name: z.string().optional(),
  person_email: z.string().optional(),
  person_telephone: z.string().optional(),
  person_mobile: z.string().optional(),
  person_fax: z.string().optional(),
  address_line_1: z.string().optional(),
  address_city: z.string().optional(),
  address_country_id: z.string().optional(),
  address_postal_code: z.string().optional(),
  address_name: z.string().optional(),
});

const getInitValues = (contact?: Contact): FormValidationSchema => {
  return {
    name: get(contact, ["name"], "") || "",
    contact_type: get(contact, ["contact_types", 0, "id"], "") || "",
    reference: get(contact, ["reference"], "") || "",
    person_name: get(contact, ["main_contact_person", "name"], "") || "",
    person_email: get(contact, ["main_contact_person", "email"], "") || "",
    person_telephone: get(contact, ["main_contact_person", "telephone"], "") || "",
    person_mobile: get(contact, ["main_contact_person", "mobile"], "") || "",
    person_fax: get(contact, ["main_contact_person", "fax"], "") || "",
    address_name: get(contact, ["main_address", "name"], "") || "",
    address_line_1: get(contact, ["main_address", "address_line_1"], "") || "",
    address_city: get(contact, ["main_address", "city"], "") || "",
    address_country_id: get(contact, ["main_address", "country", "id"], "") || "",
    address_postal_code: get(contact, ["main_address", "postal_code"], "") || "",
  };
};

const getContactValues = (values: FormValidationSchema): ContactValues => {
  return {
    name: get(values, ["name"]),
    contact_type_ids: [get(values, ["contact_type"])],
    reference: values.reference || "",
    main_contact_person: {
      name: values.person_name || "",
      email: values.person_email || "",
      telephone: values.person_telephone || "",
      mobile: values.person_mobile || "",
      fax: values.person_fax || "",
    },
    main_address: {
      name: values.address_name || "",
      address_line_1: values.address_line_1 || "",
      city: values.address_city || "",
      country_id: values.address_country_id || "",
      postal_code: values.address_postal_code || "",
      is_main_address: true,
    },
  };
};

export {
  getInitValues,
  getContactValues,
  validationSchema,
};
