import { Fragment } from "react";
import size from "lodash/size";
import { Radio } from "@deskpro/deskpro-ui";
import { LoadingSpinner, HorizontalDivider } from "@deskpro/app-sdk";
import { ContactItem } from "../../ContactItem";
import { NoFound, Card } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Contact } from "../../../services/sage/types";

export type Props = {
  isLoading: boolean,
  contacts: Array<Contact>,
  selectContact: Maybe<Contact["id"]>,
  onChangeSelectedContact: (contactId: Contact["id"]) => void,
};

const Contacts: FC<Props> = ({
  contacts,
  isLoading,
  selectContact,
  onChangeSelectedContact,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>
      {!Array.isArray(contacts)
        ? <NoFound/>
        : !size(contacts)
        ? <NoFound text="No Sage contacts found"/>
        : contacts.map((contact) => (
           <Fragment key={contact.id}>
             <Card>
               <Card.Media style={{ paddingTop: "4px" }}>
                 <Radio
                   checked={selectContact === contact.id}
                   onChange={() => onChangeSelectedContact(contact.id)}
                 />
               </Card.Media>
               <Card.Body>
                 <ContactItem
                   contact={contact}
                   onChangeSelectedContact={onChangeSelectedContact}
                 />
               </Card.Body>
             </Card>
             <HorizontalDivider style={{ marginBottom: 6 }}/>
           </Fragment>
        ))
      }
    </>
  );
};

export { Contacts };
