import { getAccessTokenService } from "../../services/sage";
import { setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, } from "react";
import { OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient, } from "@deskpro/app-sdk";
import type { Maybe, Settings } from "../../types";

export type Result = {
  onSignIn: () => void,
  authUrl: string | null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const [error, setError] = useState<Maybe<string>>(null);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const navigate = useNavigate()
  useInitialisedDeskproAppClient(
    async (client) => {
      if (context?.settings.use_deskpro_saas === undefined) {
        // Make sure settings have loaded.
        return;
      }

      const clientId = context?.settings.client_id;
      const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

      if (mode === 'local' && typeof clientId !== 'string') {
        // Local mode requires a clientId.
        return;
      }

      const oauth2 =
        mode === 'local'
          // Local Version (custom/self-hosted app)
          ? await client.startOauth2Local(
            ({ state, callbackUrl }) => {
              return `https://www.sageone.com/oauth2/auth/central?response_type=code&client_id=${clientId}&filter=apiv3.1&scope=full_access&state=${state}&redirect_uri=${callbackUrl}`;
            },
            /\?code=(?<code>.+?)&/,
            async (code: string): Promise<OAuth2Result> => {
              // Extract the callback URL from the authorization URL
              const url = new URL(oauth2.authorizationUrl);
              const redirectUri = url.searchParams.get("redirect_uri");

              if (!redirectUri) {
                throw new Error("Failed to get callback URL");
              }

              const data = await getAccessTokenService(client, code, redirectUri);

              return { data }
            }
          )

          // Global Proxy Service
          : await client.startOauth2Global("a30eb717-39ff-ca9e-b3a5-dd74caa0e407/13793110-36c5-45b9-acea-83df98d39e7f");

      setAuthUrl(oauth2.authorizationUrl)
      setIsLoading(false)

      try {
        const result = await oauth2.poll()

        await setAccessTokenService(client, result.data.access_token)
        if (result.data.refresh_token) {
          await setRefreshTokenService(client, result.data.refresh_token)
        }

        // Redirect to the "LoadingApp" page, that will decide which
        // page to send the user to
        navigate("/")
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsLoading(false);
      }
    },
    [setAuthUrl, context?.settings.client_id, context?.settings.use_deskpro_saas]

  );

  const onSignIn = useCallback(() => {
    setIsLoading(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onSignIn, error, isLoading };
};

export { useLogin };
