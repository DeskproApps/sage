import { useMemo } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getCurrentUserService } from "../../services/sage";
import type { UserContext } from "../../types";

const useCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!dpUserId) {
      return;
    }

    getCurrentUserService(client)
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => {
        const contactId = get(entityIds, [0]);
        navigate(contactId ? `/home?contactId=${contactId}` : "/contact/link");
      })
      .catch(() => navigate("/login"));
  }, [dpUserId]);
};

export { useCheckAuth };
