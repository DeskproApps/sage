import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";

const getEntityListService = (
  client: IDeskproClient,
  userId: string,
): Promise<string[]> => {
  return client
    .getEntityAssociation(ENTITY, userId)
    .list();
};

export { getEntityListService };
