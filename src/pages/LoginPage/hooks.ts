import { getAccessTokenService, getCurrentUserService } from "../../services/sage";
import { IOAuth2, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient, } from "@deskpro/app-sdk";
import { setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import { useLinkedContact } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
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
  const [isPolling, setIsPolling] = useState(false)
  const [oauth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)

  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const { findContact, linkContact } = useLinkedContact();

  const navigate = useNavigate()

  useInitialisedDeskproAppClient(
    async (client) => {

      const clientId = context?.settings.client_id;
      const mode = context?.settings.use_advanced_connect === false ? 'global' : 'local';

      if (mode === 'local' && (typeof clientId !== 'string' || clientId.trim() === "")) {
        // Local mode requires a clientId.
        setError("A client ID is required");
        return;
      }

      // Start OAuth process depending on the authentication mode
      const oauth2Response =
        mode === 'local'
          // Local Version (custom/self-hosted app)
          ? await client.startOauth2Local(
            ({ state, callbackUrl }) => {
              return `https://www.sageone.com/oauth2/auth/central?response_type=code&client_id=${clientId}&filter=apiv3.1&scope=full_access&state=${state}&redirect_uri=${callbackUrl}`;
            },
            /\?code=(?<code>.+?)&/,
            async (code: string): Promise<OAuth2Result> => {
              // Extract the callback URL from the authorization URL
              const url = new URL(oauth2Response.authorizationUrl);
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

      setAuthUrl(oauth2Response.authorizationUrl)
      setOAuth2Context(oauth2Response)
    },
    [setAuthUrl, context?.settings.client_id, context?.settings.use_advanced_connect]);


  useInitialisedDeskproAppClient((client) => {
    if (!oauth2Context) {
      return
    }

    const startPolling = async () => {
      try {
        const result = await oauth2Context.poll()

        await setAccessTokenService(client, result.data.access_token)
        if (result.data.refresh_token) {
          await setRefreshTokenService(client, result.data.refresh_token)
        }

        try {
          await getCurrentUserService(client)
        } catch {
          throw new Error(`Error authenticating user`)
        }


        // Decide which page to navigate the user to
        const contactId = await findContact()

        try {
          if (contactId) {
            await linkContact(contactId)
            navigate("/home")
          } else {
            navigate("/contact/link");
          }
        } catch {
          navigate("/contact/link");
        }

        // Redirect to the "LoadingApp" page, that will decide which
        // page to send the user to
        navigate("/")
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false)
        setIsPolling(false)
      }
    }

    if (isPolling) {
      startPolling()
    }
  }, [isPolling, oauth2Context, navigate, findContact, linkContact])

  const onSignIn = useCallback(() => {
    setIsLoading(true);
    setIsPolling(true);

    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onSignIn, error, isLoading };
};

export { useLogin };
