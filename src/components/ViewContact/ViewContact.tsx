import get from "lodash/get";
import { P5 } from "@deskpro/deskpro-ui";
import { Title, Property } from "@deskpro/app-sdk";
import { getSageLink, getContactType } from "../../utils";
import { Container, SageLogo } from "../common";
import type { FC } from "react";
import type { Contact } from "../../services/sage/types";

export type Props = {
  contact: Contact,
};

const ViewContact: FC<Props> = ({ contact }) => {
  const link = getSageLink(get(contact, ["links"]));

  return (
    <Container>
      <Title
        title={get(contact, ["name"], "-") || "-"}
        {...(!link ? {} : { icon: <SageLogo/> })}
        {...(!link ? {} : { link })}
      />

      <Property
        label="Reference"
        text={get(contact, ["reference"])}
      />

      <Property
        label="Type"
        text={getContactType(get(contact, ["contact_types"]) as never)}
      />

      <Property
        label="Primary Person"
        text={get(contact, ["main_contact_person", "displayed_as"])}
      />

      <Property
        label="Primary Email"
        text={get(contact, ["main_contact_person", "email"])}
      />

      <Property
        label="Primary Telephone"
        text={get(contact, ["main_contact_person", "telephone"])}
      />

      <Property
        label="Primary Mobile"
        text={get(contact, ["main_contact_person", "mobile"])}
      />

      <Property
        label="Primary Fax"
        text={get(contact, ["main_contact_person", "fax"])}
      />

      <Property
        label="Primary Address"
        text={(
          <P5
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: get(contact, ["main_address", "displayed_as"]) || "-" }}
          />
        )}
      />
    </Container>
  );
};

export { ViewContact };
