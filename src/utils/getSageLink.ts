import get from "lodash/get";
import find from "lodash/find";
import type { Maybe } from "../types";
import type { definitions } from "../services/sage/types";

const getSageLink = (links?: Array<definitions["Link"]>): Maybe<string> => {
  const link = find(links, { type: "text/html", rel: "alternate" });

  return get(link, ["href"]);
};

export { getSageLink };
