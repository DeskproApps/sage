import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData, EntityMetadata } from "../../types";

const setEntityService = (
  client: IDeskproClient,
  dpUserId: UserData["user"]["id"],
  entityId: string,
  meta?: EntityMetadata,
) => {
  return client
    .getEntityAssociation(ENTITY, dpUserId)
    .set(entityId, meta);
};

export { setEntityService };
