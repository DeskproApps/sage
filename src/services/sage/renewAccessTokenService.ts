import { baseRequest } from "./baseRequest";
import { setAccessTokenService, setRefreshTokenService } from "../deskpro";
import { AUTH_URL, placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const renewAccessTokenService = async (client: IDeskproClient) => {
  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/token`,
    method: "POST",
    data: {
      grant_type: "refresh_token",
      client_id: placeholders.CLIENT_ID,
      client_secret: placeholders.CLIENT_SECRET,
      refresh_token: placeholders.REFRESH_TOKEN,
    },
  }).then(({ access_token, refresh_token }) => Promise.all([
    setAccessTokenService(client, access_token),
    setRefreshTokenService(client, refresh_token),
  ]));
};

export { renewAccessTokenService };
