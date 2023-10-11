import { z } from "zod";
import { validationSchema } from "./utils";
import type { Maybe } from "../../types";
import type { Contact, Address, ContactPerson, ContactType } from "../../services/sage/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type ContactValues = {
  name: Contact["name"],
  contact_type_ids: [ContactType["id"]],
  reference?: Contact["reference"],
  main_contact_person?: {
    name?: ContactPerson["name"],
    email?: ContactPerson["email"],
    telephone?: ContactPerson["telephone"],
    mobile?: ContactPerson["mobile"]
    fax?: ContactPerson["fax"],
  },
  main_address?: {
    address_line_1?: Address["address_line_1"],
    city?: Address["city"],
    country_id?: Address["country"]["id"],
    postal_code?: Address["postal_code"],
    name?: Address["name"],
    is_main_address: boolean,
  },
};

export type Props = {
  onSubmit: (values: FormValidationSchema) => Promise<void|Contact>,
  onCancel?: () => void,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>,
  contact?: Contact,
};
