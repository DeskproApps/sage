import get from "lodash/get";
import { useCallback } from "react";
import { Title } from "@deskpro/app-sdk";
import { getSageLink } from "../../utils";
import { Link, Secondary, SageLogo } from "../common";
import type { FC, MouseEventHandler } from "react";
import type { definitions } from "../../services/sage/types";

type Props = {
  contact: definitions["Contact"],
  onChangeSelectedContact: (contactId: definitions["Contact"]["id"]) => void,
};

const ContactItem: FC<Props> = ({ contact, onChangeSelectedContact }) => {
  const link = getSageLink(get(contact, ["links"]));

  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();

    if (contact?.id) {
      onChangeSelectedContact(contact.id);
    }
  }, [contact, onChangeSelectedContact]);

  return (
    <>
      <Title
        marginBottom={0}
        title={(
          <Link href="#" onClick={onClick}>{contact.displayed_as}</Link>
        )}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />
      <Secondary>{contact.email}</Secondary>
    </>
  );
};

export { ContactItem };
