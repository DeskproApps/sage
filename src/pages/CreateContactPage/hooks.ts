import get from "lodash/get";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { UserContext } from "../../types";
import type { Contact } from "../../services/sage/types";

export type Result = {
  contact: Contact;
};

type UseDeskproUserAsContact = () => Result;

const useDeskproUserAsContact: UseDeskproUserAsContact = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };

  const contactLike = {
    main_contact_person: {
      name: get(context, ["data", "user", "name"], ""),
      email: get(context, ["data", "user", "primaryEmail"], ""),
    },
  };

  return { contact: contactLike as Contact };
};

export { useDeskproUserAsContact };
