import get from "lodash/get";
import size from "lodash/size";
import uniq from "lodash/uniq";
import { z } from "zod";
import { ErrorType } from "../../services/sage/types";
import { getOption } from "../../utils";
import { DEFAULT_ERROR } from "../../constants";
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

const getOptions = <T>(items?: T[]) => {
  if (!Array.isArray(items) || !size(items)) {
    return [];
  }

  return items.map((item) => {
    return getOption(get(item, ["id"]), get(item, ["displayed_as"]));
  });
};

const generateErrorMessage = (err: ErrorType) => {
  const message = get(err, ["$message"], "");
  const source = get(err, ["$source"], "");

  if (source && message) {
    return `${source}: ${message}`;
  } else if (!source && message) {
    return message;
  } else {
    return DEFAULT_ERROR;
  }
};

const getErrors = (errors: ErrorType|ErrorType[]): string[] => {
  const result: string[] = [];

  if (!Array.isArray(errors)) {
    result.push(generateErrorMessage(errors));
  }

  if (Array.isArray(errors)) {
    errors.forEach((err) => {
      result.push(generateErrorMessage(err));
    });
  }

  return uniq(result);
};

export {
  getErrors,
  getOptions,
  getInitValues,
  getContactValues,
  validationSchema,
  generateErrorMessage,
};
