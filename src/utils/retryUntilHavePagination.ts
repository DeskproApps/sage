import get from "lodash/get";
import concat from "lodash/concat";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination } from "../services/sage/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseCallback<T> = (client: IDeskproClient, params?: any) => Promise<Pagination<T>>;

const retryUntilHavePagination = <T>(fn: PromiseCallback<T>): PromiseCallback<T> => {
  return (client, params) => {
    let result: T[] = [];
    let nextPage: number = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const run: () => Promise<any> = () => {
      return fn(client, {...params, page: nextPage }).then((res) => {
        const isNextPage = Boolean(get(res, ["$next"], null));
        nextPage += 1;
        const values = get(res, ["$items"], []) || [];
        result = !values ? result : concat(result, values);

        if (!isNextPage) {
          return { $items: result };
        }

        return run();
      });
    };

    return run();
  }
};

export { retryUntilHavePagination };
