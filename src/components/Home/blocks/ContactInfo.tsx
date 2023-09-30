import { useMemo } from "react";
import get from "lodash/get";
import { Title, Property } from "@deskpro/app-sdk";
import { getSageLink } from "../../../utils";
import { SageLogo } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { definitions } from "../../../services/sage/types";

export type Props = {
  contact: Maybe<definitions["Contact"]>;
};

const ContactInfo: FC<Props> = ({ contact }) => {
  const link = useMemo(() => getSageLink(get(contact, ["links"])), [contact]);

  return (
    <>
      <Title
        title={get(contact, ["displayed_as"], "-") || "-"}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
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
