import get from "lodash/get";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { SageError } from "../../services/sage";
import { Container, ErrorBlock } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message = DEFAULT_ERROR;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof SageError) {
    message = get(error, ["data", 0, "$message"])
      || get(error, ["data", "$message"])
      || DEFAULT_ERROR;
  }

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{padding: "8px"}}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
