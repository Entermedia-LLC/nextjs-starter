"use client";

/**
 * Import react dependencies
 */
import { ReactElement, ReactNode } from "react";

/**
 * Impoer next dependencies
 */
import { usePathname } from "next/navigation";

/**
 * Import external dependencies
 */
import cn from "classnames";

/**
 * Import internal dependencies
 */
import isLinkActive from "@/functions/isLinkActive";

/**
 * Import internal component dependencies
 */
import Link from "@/components/atomic-design/atoms/Link";

/**
 * Import scoped styles
 */
import styles from "./Navigation.module.scss";

/**
 * Render the NavigationMenu component.
 *
 * Recursively displays a menu and its children.
 */
function NavigationMenu({
  items,
}: {
  items: NavigationItemProps[];
}): ReactElement | null {
  const pathname = usePathname() as string;

  if (!items || !items?.length) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            onMouseEnter={() => {
              item?.onLiMouseEnter && item.onLiMouseEnter(index, item);
            }}
            onMouseLeave={() => {
              item?.onLiMouseLeave && item.onLiMouseLeave(index, item);
            }}
            className={cn(
              styles[`menu__item`],
              item?.liClassName,
              item?.children?.items?.length
                ? styles[`menu__item--has-children`]
                : ""
            )}
          >
            {item?.beforeLabel && item.beforeLabel}
            <Link
              href={item.path}
              target={item.target ? item.target : "_self"}
              className={cn(
                isLinkActive(pathname, item.path) && styles.active,
                item?.linkClassName
              )}
              onClick={(e) => {
                item?.onLinkClick && item.onLinkClick(e, index, item);
              }}
            >
              {item.label}
            </Link>
            {item?.afterLabel && item.afterLabel}

            {item?.showChildren &&
              item?.children?.items &&
              item.children.items.length > 0 && (
                <>
                  {item?.children?.Title && item.children.Title}
                  <ul
                    className={cn(
                      styles["menu"],
                      item?.children?.className ? item?.children?.className : ""
                    )}
                  >
                    <NavigationMenu items={item.children.items} />
                  </ul>
                </>
              )}
          </li>
        );
      })}
    </>
  );
}

export interface NavigationItemProps {
  /** Item label. */
  label: string | ReactElement | ReactNode;
  /** After label. */
  afterLabel?: string | ReactElement | ReactNode;
  /** Before label. */
  beforeLabel?: string | ReactElement | ReactNode;
  /** Item path. */
  path: string;
  /** Link target. */
  target?: string;
  /** Link click handler. */
  onLinkClick?: (
    event: React.MouseEvent<Element, MouseEvent>,
    itemIndex: number,
    item: NavigationItemProps
  ) => void;
  /** li mouse enter handler. */
  onLiMouseEnter?: (index: number, item: NavigationItemProps) => void;
  /** li mouse leave handler. */
  onLiMouseLeave?: (index: number, item: NavigationItemProps) => void;
  /** li class name. */
  liClassName?: string;
  /** Link class name. */
  linkClassName?: string;
  /** Determines if child menu items should be displayed. */
  showChildren?: boolean;
  /** Children */
  children?: {
    items: NavigationItemProps[];
    className?: string;
    Title?: ReactElement | ReactNode;
  };
}

/**
 * Render the Navigation component.
 */
export default function Navigation({
  items,
  className,
  listClassName,
  ...props
}: NavigationProps): ReactElement {
  return (
    <>
      {!!items?.length && (
        <nav className={cn(styles.navigation, className)} {...props}>
          <ul className={cn(styles.menu, listClassName)}>
            <NavigationMenu items={items} />
          </ul>
        </nav>
      )}
    </>
  );
}

export interface NavigationProps {
  /** Array of menu items. */
  items?: NavigationItemProps[];
  /** Navigation container class name. */
  className?: string;
  /** List container class name. */
  listClassName?: string;
  /** Inline container styles */
  style?: {};
}
