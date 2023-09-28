import styled from "styled-components";
import type { IconProps, ThemeColors } from "@deskpro/deskpro-ui";

export type Props = {
  href?: string,
  color?: keyof ThemeColors,
  size?: IconProps["size"];
};

const Link = styled.a<{ color?: keyof ThemeColors }>`
  color: ${({ theme, color = "cyan100" }) => theme.colors[color]};
  text-decoration: none;
`;

export { Link };
