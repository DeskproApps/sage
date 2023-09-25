import { P5 } from "@deskpro/deskpro-ui";
import { Title, useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const NoLinkedContactPage: FC = () => {
  useSetTitle("Sage");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
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
    <>
      <Title title="No contact linked"/>
      <P5>Contact must be linked to the Deskpro user</P5>
    </>
  );
}

export { NoLinkedContactPage };
