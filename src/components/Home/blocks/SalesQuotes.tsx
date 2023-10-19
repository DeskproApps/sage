import { useCallback } from "react";
import size from "lodash/size";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@deskpro/app-sdk";
import { nbsp } from "../../../constants";
import { isLast } from "../../../utils";
import { NoFound, Link, LinkIcon } from "../../common";
import { SalesQuoteItem } from "../../SalesQuoteItem";
import type { FC, MouseEvent } from "react";
import type { Maybe } from "../../../types";
import type { SalesQuote } from "../../../services/sage/types";

export type Props = {
  quotes: Array<SalesQuote>,
  newSalesQuoteLink: Maybe<string>,
  onNavigateToSalesQuotes: () => void,
};

const SalesQuotes: FC<Props> = ({
  quotes,
  newSalesQuoteLink,
  onNavigateToSalesQuotes,
}) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToSalesQuotes && onNavigateToSalesQuotes();
  }, [onNavigateToSalesQuotes]);

  return (
    <>
      <Title
        title={(
          <>
            <Link href="#" onClick={onClick}>
              Sales Quotes ({size(quotes)})
            </Link>
            {nbsp}
            {newSalesQuoteLink && (
              <LinkIcon href={newSalesQuoteLink} icon={faPlus} />
            )}
          </>
        )}
      />
      {!Array.isArray(quotes) || !size(quotes)
        ? <NoFound text="No Sales Quotes found"/>
        : quotes.map((quote, idx) => (
          <SalesQuoteItem key={quote.id} quote={quote} isLast={isLast(quotes, idx)}/>
        ))
      }
    </>
  );
};

export { SalesQuotes };
