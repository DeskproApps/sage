import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  deleteEntityService,
  getEntityListService,
} from "../services/deskpro";
import { useAsyncError } from "./useAsyncError";
import type { UserContext } from "../types";

export type Result = {
  isLoading: boolean,
  unlink: () => Promise<void>,
};

type UseUnlinkContact = () => Result;

const useUnlinkContact: UseUnlinkContact = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const unlink = useCallback(() => {
    if (!client || !dpUserId) {
      throw Error("Deskpro apps client is not ready yet");
    }

    setIsLoading(true);

    return getEntityListService(client, dpUserId)
      .then((entityIds) => Promise.all(entityIds.map((unlinkContactId) =>
        deleteEntityService(client, dpUserId, unlinkContactId)
      )))
      .then(() => {
        setIsLoading(false);
        navigate("/contact/link");
      })
      .catch(asyncErrorHandler);
  }, [client, dpUserId, navigate, asyncErrorHandler]);

  return { unlink, isLoading };
};

export { useUnlinkContact };
