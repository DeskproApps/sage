import styled from "styled-components";
import { Link as NativeRouterLink } from "react-router-dom";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { LinkProps } from "react-router-dom";
import type { IconProps, ThemeColors, AnyIcon } from "@deskpro/deskpro-ui";
import { DeskproAppTheme } from "@deskpro/app-sdk";

export type Props = {
  href?: string,
  color?: keyof ThemeColors,
  size?: IconProps["size"];
};

const Link = styled.a<{ color?: keyof ThemeColors } & DeskproAppTheme>`
  color: ${({ theme, color = "cyan100" }) => theme.colors[color]};
  text-decoration: none;
`;

const RouterLink: FC<LinkProps & Props> = (props) => (
  <Link {...props} as={NativeRouterLink} />
);

const LinkIcon: FC<Props & { icon?: AnyIcon }> = ({
  size = 10,
  color = "grey40",
  icon = faArrowUpRightFromSquare,
  href,
  ...props
}) => {
  return !href ? <></> : (
    <Link target="_blank" color={color} href={href} {...props}>
      <Icon size={size} icon={icon} />
    </Link>
  )
};

export { Link, RouterLink, LinkIcon };
