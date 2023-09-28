import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { SearchStyled, Buttons, Contacts } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { definitions } from "../../services/sage/schema";

type Props = {
  onChangeSearch: (search: string) => void,
  selectedContact: Maybe<definitions["Contact"]["id"]>,
  isSubmitting: boolean,
  onLinkContact: () => void,
  isLoading: boolean,
  contacts: Array<definitions["Contact"]>,
  onChangeSelectedContact: (contactId: definitions["Contact"]["id"]) => void,
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
  onChangeSelectedContact,
}) => {
  return (
    <>
      <Container>
        <SearchStyled onChange={onChangeSearch} />
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
