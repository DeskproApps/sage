import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData } from "../../types";

const setEntityService = (
  client: IDeskproClient,
  dpUserId: UserData["user"]["id"],
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, dpUserId)
    .set(entityId);
};

export { setEntityService };
