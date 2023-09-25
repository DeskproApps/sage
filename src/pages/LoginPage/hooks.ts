import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";
import capitalize from "lodash/capitalize";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  getEntityListService,
  setAccessTokenService,
  setRefreshTokenService,
} from "../../services/deskpro";
import {
  getAccessTokenService,
  getCurrentUserService,
} from "../../services/sage";
import { getQueryParams } from "../../utils";
import { DEFAULT_ERROR } from "../../constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { Maybe, UserContext } from "../../types";

export type Result = {
  poll: () => void,
  authUrl: string|null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const key = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const [callback, setCallback] = useState<OAuth2StaticCallbackUrl|undefined>();
  const [authUrl, setAuthUrl] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { client } = useDeskproAppClient();
  const clientId = useMemo(() => get(context, ["settings", "client_id"]), [context]);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient(
    (client) => {
      client.oauth2()
        .getGenericCallbackUrl(key, /code=(?<token>[^&]+)/, /state=(?<key>.+)/)
        .then(setCallback);
    },
    [setCallback]
  );

  useEffect(() => {
    if (callback?.callbackUrl) {
      setAuthUrl(`https://www.sageone.com/oauth2/auth/central?${getQueryParams({
        filter: "apiv3.1",
        response_type: "code",
        client_id: clientId,
        redirect_uri: callback.callbackUrl,
        scope: "full_access",
        state: key,
      })}`);
    }
  }, [callback, clientId, key]);

  const poll = useCallback(() => {
    if (!client || !callback?.poll || !dpUserId) {
      return;
    }

    setError(null);
    setTimeout(() => setIsLoading(true), 1000);

    callback.poll()
      .then(({ token }) => getAccessTokenService(client, token, callback.callbackUrl))
      .then(({ access_token, refresh_token }) => Promise.all([
        setAccessTokenService(client, access_token),
        setRefreshTokenService(client, refresh_token),
      ]))
      .then(() => getCurrentUserService(client))
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => {
        const contactId = get(entityIds, [0]);
        navigate(contactId ? `/home?contactId=${contactId}` : "/contact/link");
      })
      .catch((err) => {
        const error = get(err, ["data"]);
        const message = get(error, [0, "$message"]) || get(error, ["$message"]) || DEFAULT_ERROR;

        setIsLoading(false);
        setError(capitalize(message));
      });
  }, [client, callback, navigate, dpUserId]);

  return { authUrl, poll, error, isLoading };
};

export { useLogin };
