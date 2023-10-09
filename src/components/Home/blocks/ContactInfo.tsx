import { useMemo } from "react";
import get from "lodash/get";
import { Title, Property, TwoProperties } from "@deskpro/app-sdk";
import { getSageLink, getContactType } from "../../../utils";
import { SageLogo, RouterLink } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Contact } from "../../../services/sage/types";

export type Props = {
  contact: Maybe<Contact>;
};

const ContactInfo: FC<Props> = ({ contact }) => {
  const link = useMemo(() => getSageLink(get(contact, ["links"])), [contact]);
  const contactId = useMemo(() => get(contact, ["id"]), [contact]);
  const contactName = useMemo(() => get(contact, ["name"], "-"), [contact]);

  return (
    <>
      <Title
        title={!contactId
          ? contactName
          : <RouterLink to={`/contact/view/${contactId}`}>{contactName}</RouterLink>
        }
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />
      <TwoProperties
        leftLabel="Reference"
        leftText={get(contact, ["reference"])}
        rightLabel="Type"
        rightText={getContactType(get(contact, ["contact_types"]) as never)}
      />
      <Property
        label="Primary Person"
        text={get(contact, ["main_contact_person", "displayed_as"], "-") || "-"}
      />
      <Property
        label="Primary Email"
        text={get(contact, ["main_contact_person", "email"], "-") || "-"}
      />
    </>
  );
};

export { ContactInfo };
