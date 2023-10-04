import get from "lodash/get";
import size from "lodash/size";
import uniq from "lodash/uniq";
import isEmpty from "lodash/isEmpty";
import { z } from "zod";
import { ErrorType } from "../../services/sage/types";
import { getOption } from "../../utils";
import { DEFAULT_ERROR } from "../../constants";
import type { FormValidationSchema, ContactValues } from "./types";

const validationSchema = z.object({
  name: z.string().nonempty(),
  contact_type: z.string().nonempty(),
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

const getInitValues = (): FormValidationSchema => {
  return {
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
  };
};

const getContactValues = (values: FormValidationSchema): ContactValues => {
  const person = {
    ...(!values.person_name ? {} : { name: values.person_name }),
    ...(!values.person_email ? {} : { email: values.person_email }),
    ...(!values.person_telephone ? {} : { telephone: values.person_telephone }),
    ...(!values.person_mobile ? {} : { mobile: values.person_mobile }),
    ...(!values.person_fax ? {} : { fax: values.person_fax }),
  };

  const address = {
    ...(!values.address_name ? {} : { name: values.address_name }),
    ...(!values.address_line_1 ? {} : { address_line_1: values.address_line_1 }),
    ...(!values.address_city ? {} : { city: values.address_city }),
    ...(!values.address_country_id ? {} : { country_id: values.address_country_id }),
    ...(!values.address_postal_code ? {} : { postal_code: values.address_postal_code }),
  };

  return {
    name: get(values, ["name"]),
    contact_type_ids: [get(values, ["contact_type"])],
    ...(!values.reference ? {} : { reference: values.reference }),
    ...(isEmpty(person) ? {} : { main_contact_person: person }),
    ...(isEmpty(address) ? {} : { main_address: { ...address, is_main_address: true }}),
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
