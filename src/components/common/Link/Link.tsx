import styled from "styled-components";
import { Link as NativeRouterLink } from "react-router-dom";
import type { FC } from "react";
import type { LinkProps } from "react-router-dom";
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

const RouterLink: FC<LinkProps & Props> = (props) => (
  <Link {...props} as={NativeRouterLink} />
);

export { Link, RouterLink };
