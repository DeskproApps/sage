import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";
import {Address, ContactPerson, ContactType} from "./types";

type Data = {
  name: Contact["name"],
  contact_type_ids: [ContactType["id"]],
  reference: Contact["reference"],
  main_contact_person: Partial<Pick<
    ContactPerson,
    "name"|"email"|"telephone"|"mobile"|"fax"
  >>,
  main_address: Partial<
    Pick<Address, "name"|"address_line_1"|"city"|"postal_code">
  > & {
    country_id: Address["country"]["id"],
    is_main_address: boolean,
  },
};

const updatesContactService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  data: Data,
) => {
  return baseRequest(client, {
    url: `/contacts/${contactId}`,
    method: "PUT",
    data: {
      contact: data,
    },
  });
};

export { updatesContactService };
