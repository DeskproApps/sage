import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, ContactType, ContactPerson, Address } from "./types";

const createContactService = (
  client: IDeskproClient,
  data: {
    name: Contact["name"],
    contact_type_ids: [ContactType["id"]],
    reference?: Contact["reference"],
    main_contact_person?: Partial<Pick<
      ContactPerson,
      "name"|"email"|"telephone"|"mobile"|"fax"
    >>,
    main_address?: Partial<
      Pick<Address, "name"|"address_line_1"|"city"|"postal_code">
    > & {
      country_id?: Address["country"]["id"],
      is_main_address: boolean,
    },
  },
) => {
  return baseRequest<Contact>(client, {
    url: "/contacts",
    method: "POST",
    data: {
      contact: data,
    },
  });
};

export { createContactService };
