import { Container } from "../common";
import { ContactForm } from "../ContactForm";
import type { FC } from "react";
import type { Contact } from "../../services/sage/types";
import type { Props as FormProps } from "../ContactForm";

type Props = Omit<FormProps, "contact"> & {
  contact: Contact;
};

const EditContact: FC<Props> = (props) => {
  return (
    <Container>
      <ContactForm isEditMode {...props}/>
    </Container>
  );
};

export { EditContact };
