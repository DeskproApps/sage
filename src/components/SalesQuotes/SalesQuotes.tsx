import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { isLast } from "../../utils";
import { Container, NoFound, LinkIcon } from "../common";
import { nbsp } from "../../constants";
import { SalesQuoteItem } from "../SalesQuoteItem";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { SalesQuote } from "../../services/sage/types";

export type Props = {
  quotes: SalesQuote[],
  newSalesQuoteLink: Maybe<string>
};

const SalesQuotes: FC<Props> = ({ quotes, newSalesQuoteLink }) => {
  return (
    <Container>
      <Title
        title={(
          <>
            Sales Quotes ({size(quotes)})
            {nbsp}
            {newSalesQuoteLink && (
              <LinkIcon icon={faPlus} href={newSalesQuoteLink} />
            )}
          </>
        )}
      />

      {!Array.isArray(quotes) || !size(quotes)
        ? <NoFound text="No Sales Quotes found"/>
        : quotes.map((quote, idx) => (
          <SalesQuoteItem
            key={quote.id}
            quote={quote}
            isLast={isLast(quotes, idx)}
          />
        ))
      }
    </Container>
  );
};

export { SalesQuotes };
