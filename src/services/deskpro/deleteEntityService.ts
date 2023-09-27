import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";

const deleteEntityService = (
  client: IDeskproClient,
  dpUserId: string,
  entityId: string,
) => {
  return client
    .getEntityAssociation(ENTITY, dpUserId)
    .delete(entityId);
};

export { deleteEntityService };
