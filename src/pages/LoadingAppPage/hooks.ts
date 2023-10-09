import { useMemo } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useLinkedContact } from "../../hooks";
import { getCurrentUserService } from "../../services/sage";
import type { UserContext } from "../../types";

const useCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { findContact, linkContact } = useLinkedContact();
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!dpUserId) {
      return;
    }

    getCurrentUserService(client)
      .then(() => findContact())
      .then((contactId) => {
        if (contactId) {
          linkContact(contactId).then(() => navigate("/home"));
        } else {
          navigate("/contact/link");
        }
      })
      // .then(() => navigate("/sales-invoices/9c5ba5b37adf4bc29487931ffee67d5f"))
      .catch(() => navigate("/login"));
  }, [dpUserId]);
};

export { useCheckAuth };
