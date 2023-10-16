import { P4, Stack, TSpan } from "@deskpro/deskpro-ui";
import { formatPrice } from "../../../utils";
import { Secondary } from "../Typography";
import type { FC, ReactNode } from "react";

type Props = {
  label?: string|number|JSX.Element|ReactNode,
  description?: string|number|JSX.Element|ReactNode,
  price?: string|number,
  currency?: string,
};

const Price: FC<Props> = ({ price, description, label, currency }) => {
  if (!price && !description && !label) {
    return <></>;
  }

  return (
    <Stack justify="space-between" style={{ marginBottom: 10 }}>
      {(label || description) && (
        <div>
          {label && <TSpan type="p5">{label}</TSpan>}
          {" "}
          {description && <Secondary type="p11">{description}</Secondary>}
        </div>
      )}
      {price && <P4>{formatPrice(price, currency)}</P4>}
    </Stack>
  );
};

export { Price };
