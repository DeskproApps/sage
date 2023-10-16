import { HorizontalDivider, Search } from "@deskpro/app-sdk";
import { Container, Navigation } from "../common";
import { Buttons, Contacts } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Contact } from "../../services/sage/types";

export type Props = {
  onChangeSearch: (search: string) => void,
  selectedContact: Maybe<Contact["id"]>,
  isSubmitting: boolean,
  onLinkContact: () => void,
  isLoading: boolean,
  contacts: Array<Contact>,
  onChangeSelectedContact: (contactId: Contact["id"]) => void,
  onNavigateToCreate: () => void,
  onCancel?: () => void,
};

const LinkContact: FC<Props> = ({
  onChangeSearch,
  onCancel,
  contacts,
  isLoading,
  isSubmitting,
  onLinkContact,
  selectedContact,
  onNavigateToCreate,
  onChangeSelectedContact,
}) => {
  return (
    <>
      <Container>
        <Navigation
          selected="link"
          onNavigateToCreate={onNavigateToCreate}
        />
        <Search
          onChange={onChangeSearch}
          inputProps={{ variant: "normal" }}
        />
        <Buttons
          onLinkContact={onLinkContact}
          selectedContact={selectedContact}
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Contacts
          contacts={contacts}
          selectContact={selectedContact}
          isLoading={isLoading}
          onChangeSelectedContact={onChangeSelectedContact}
        />
      </Container>
    </>
  );
};

export { LinkContact };
