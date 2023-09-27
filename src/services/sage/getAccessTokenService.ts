import { baseRequest } from "./baseRequest";
import { AUTH_URL, placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  code: string,
  redirectUri: string,
) => {
  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/token`,
    method: "POST",
    data: {
      grant_type: "authorization_code",
      client_id: placeholders.CLIENT_ID,
      client_secret: placeholders.CLIENT_SECRET,
      redirect_uri: redirectUri,
      code,
    },
  });
};

export { getAccessTokenService };
