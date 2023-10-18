import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../utils";
import { Container, NoFound, LinkIcon } from "../common";
import { nbsp } from "../../constants";
import { SalesEstimateItem } from "../SalesEstimateItem";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { SalesEstimate } from "../../services/sage/types";

export type Props = {
  estimates: SalesEstimate[],
  newSalesEstimateLink: Maybe<string>
};

const SalesEstimates: FC<Props> = ({ estimates, newSalesEstimateLink }) => {
  return (
    <Container>
      <Title
        title={(
          <>
            Sales Estimates ({size(estimates)})
            {nbsp}
            {newSalesEstimateLink && (
              <LinkIcon icon={faPlus} href={newSalesEstimateLink} />
            )}
          </>
        )}
      />

      {!Array.isArray(estimates) || !size(estimates)
        ? <NoFound text="No Sales Estimates found"/>
        : estimates.map((estimate, idx) => (
          <SalesEstimateItem
            key={estimate.id}
            estimate={estimate}
            isLast={isLast(estimates, idx)}
          />
        ))
      }
    </Container>
  );
};

export { SalesEstimates };
