import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { getContactType } from "./getContactType";
import type { EntityMetadata } from "../types";
import type { Contact } from "../services/sage/types";

const getEntityMetadata = (contact?: Contact): EntityMetadata|undefined => {
  if (isEmpty(contact)) {
    return;
  }

  return {
    id: get(contact, ["id"]),
    contact: get(contact, ["name"]),
    contactType: getContactType(get(contact, ["contact_types"]) as never),
    personPrimary: get(contact, ["main_contact_person", "displayed_as"]),
    personEmail: get(contact, ["main_contact_person", "email"]),
  };
};

export { getEntityMetadata };
