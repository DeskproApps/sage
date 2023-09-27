import styled from "styled-components";

const CardBase = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const DEFAULT_SIZE = 14;

const CardMedia = styled.div<{ size?: number }>`
  width: ${({ size = DEFAULT_SIZE }) => size}px;
`;

const CardBody = styled.div<{ size?: number }>`
  width: ${({ size = DEFAULT_SIZE }) => `calc(100% - ${size}px - 8px);`}
`;

type CardType = typeof CardBase & {
  Media: typeof CardMedia;
  Body: typeof CardBody;
};

const Card: CardType = Object.assign(CardBase, {
  Media: CardMedia,
  Body: CardBody,
});

export { Card };
