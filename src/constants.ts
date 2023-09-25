/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

/** Deskpro */
export const APP_PREFIX = "sage";

export const ENTITY = "linkedSageContact";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";
export const REFRESH_TOKEN_PATH = "oauth2/refresh_token";

export const placeholders = {
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  REFRESH_TOKEN: `[user[${REFRESH_TOKEN_PATH}]]`,
  CLIENT_ID: "__client_id__",
  CLIENT_SECRET: "__client_secret__",
};

export const DEFAULT_ERROR = "There was an error!"

/** Sage */
export const BASE_URL = "https://api.accounting.sage.com/v3.1";
export const AUTH_URL = "https://oauth.accounting.sage.com";
