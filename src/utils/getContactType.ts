import get from "lodash/get";
import isPlainObject from "lodash/isPlainObject";
import { match } from "ts-pattern";
import type { Maybe } from "../types";
import type { ContactPersonType } from "../services/sage/types";

type ContactType = Maybe<
  | ContactPersonType
  | Array<ContactPersonType>
>;

const getContactType = (type: ContactType): string|undefined => {
  if (!Array.isArray(type) && !isPlainObject(type)) {
    return;
  }

  const typeId = isPlainObject(type) ? get(type, ["id"]) : get(type, [0, "id"]);

  return match(typeId)
    .with("CUSTOMER", () => "Customer")
    .with("VENDOR", () => "Supplier")
    .otherwise(() => undefined);
};

export { getContactType };
