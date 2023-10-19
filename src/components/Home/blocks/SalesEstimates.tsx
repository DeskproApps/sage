import { useCallback } from "react";
import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { nbsp } from "../../../constants";
import { isLast } from "../../../utils";
import { NoFound, Link, LinkIcon } from "../../common";
import { SalesEstimateItem } from "../../SalesEstimateItem";
import type { FC, MouseEvent } from "react";
import type { Maybe } from "../../../types";
import type { SalesEstimate } from "../../../services/sage/types";

export type Props = {
  estimates: Array<SalesEstimate>,
  newSalesEstimateLink: Maybe<string>,
  onNavigateToSalesEstimates: () => void,
};

const SalesEstimates: FC<Props> = ({
  estimates,
  newSalesEstimateLink,
  onNavigateToSalesEstimates,
}) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToSalesEstimates && onNavigateToSalesEstimates();
  }, [onNavigateToSalesEstimates]);

  return (
    <>
      <Title
        title={(
          <>
            <Link href="#" onClick={onClick}>
              Sales Estimates ({size(estimates)})
            </Link>
            {nbsp}
            {newSalesEstimateLink && (
              <LinkIcon href={newSalesEstimateLink} icon={faPlus} />
            )}
          </>
        )}
      />
      {!Array.isArray(estimates) || !size(estimates)
        ? <NoFound text="No Sales Estimates found"/>
        : estimates.map((estimate, idx) => (
          <SalesEstimateItem key={estimate.id} estimate={estimate} isLast={isLast(estimates, idx)}/>
        ))
      }
    </>
  );
};

export { SalesEstimates };
