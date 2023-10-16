import { P5 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Container } from "../../components/common";
import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const NoLinkedContactPage: FC = () => {
  useSetTitle("Sage");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/contact/link" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: {
          type: "logout",
        },
      }],
    });
  });

  return (
    <Container>
      <Title title="No contact linked"/>
      <P5>Contact must be linked to the Deskpro user</P5>
    </Container>
  );
}

export { NoLinkedContactPage };
