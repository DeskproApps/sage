import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { definitions } from "../../../services/sage/types";

export type Props = {
  selectedContact?: Maybe<definitions["Contact"]["id"]>,
  isSubmitting?: boolean,
  onLinkContact?: () => void,
  onCancel?: () => void,
};

const Buttons: FC<Props> = ({ isSubmitting, selectedContact, onLinkContact, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Contact"
      disabled={!selectedContact || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkContact}
    />
    {onCancel && (
      <Button
        type="button"
        text="Cancel"
        intent="secondary"
        onClick={onCancel}
      />
    )}
  </Stack>
);

export { Buttons };
