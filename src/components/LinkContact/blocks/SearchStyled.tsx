import styled from "styled-components";
import { Search } from "@deskpro/app-sdk";
import type { FC } from "react";

type Props = {
  onChange?: (search: string) => void,
};

const SearchContainer = styled.div`
  [data-dp-name=Input] {
    display: flex;
    margin-bottom: 10px;
  }
`;

const SearchStyled: FC<Props> = ({ onChange }) => (
  <SearchContainer>
    <Search {...(onChange ? { onChange } : {})} />
  </SearchContainer>
);

export { SearchStyled };
