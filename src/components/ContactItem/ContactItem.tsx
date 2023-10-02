import get from "lodash/get";
import { useCallback } from "react";
import { Title, Property, TwoProperties } from "@deskpro/app-sdk";
import { getSageLink, getContactType } from "../../utils";
import { Link, SageLogo } from "../common";
import type { FC, MouseEventHandler } from "react";
import type { definitions } from "../../services/sage/types";

export type Props = {
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
          <Link href="#" onClick={onClick}>{get(contact, ["name"], "-") || "-"}</Link>
        )}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />
      <TwoProperties
        leftLabel="Reference"
        leftText={get(contact, ["reference"])}
        rightLabel="Type"
        rightText={getContactType(get(contact, ["contact_types"]))}
      />
      <Property
        label="Email"
        text={get(contact, ["email"])}
      />
    </>
  );
};

export { ContactItem };
