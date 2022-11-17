// Import React.js dependencies
import React, { ReactElement, ReactNode } from "react";

// Import Next.js dependencies
import Image from "next/image";

// Import functions
import cn from "classnames";
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
} from "html-react-parser";

// Import component dependencies
import Link from "../Link";
import Figure from "../Figure";
import Blockquote from "../Blockquote";

// Import types
import PropTypes from "prop-types";

// Import styles
import "./wordpress-blocks.scss";
import styles from "./RichText.module.scss";

// Parser options
const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode.constructor.name === "Element") {
      // @TODO: Fix TS warning.
      // @ts-ignore
      if (domNode.name === "img") {
        // @TODO: Fix TS warning.
        // @ts-ignore
        const { src, alt, width = 100, height = 100 } = domNode.attribs;

        return (
          <Image
            src={src}
            alt={alt}
            width={Number(width)}
            height={Number(height)}
          />
        );
      }

      // @TODO: Fix TS warning.
      // @ts-ignore
      if (domNode.name === "a") {
        // @TODO: Fix TS warning.
        // @ts-ignore
        const { href, class: className } = domNode.attribs;

        return (
          <Link href={href} className={className}>
            {/*
            // @TODO: Fix TS warning.
            // @ts-ignore */}
            {domToReact(domNode.children)}
          </Link>
        );
      }

      // @TODO: Fix TS warning.
      // @ts-ignore
      if (domNode.name === "blockquote") {
        // @TODO: Fix TS warning, parse <cite> & pass it's value to the Figure caption prop.
        // @ts-ignore
        const { class: className } = domNode.attribs;

        return (
          <Figure className={className}>
            <Blockquote>
              {/*
              // @TODO: Fix TS warning.
              // @ts-ignore */}
              {domToReact(domNode.children)}
            </Blockquote>
          </Figure>
        );
      }
    }
  },
};

/**
 * Render the RichText component.
 */
export default function RichText({
  attributes,
  children,
  className,
  dropCap,
  id,
  style,
  tag,
}: RichTextProps) {
  const tagClassName = tag !== "div" ? tag : "";

  const html = parse(children, options);

  return React.createElement(
    tag,
    {
      ...attributes,
      className: cn(
        styles.richtext,
        styles?.[tagClassName],
        dropCap && styles.dropcap,
        className
      ),
      id: id || null,
      style: style,
    },
    html
  );
}

export interface RichTextProps {
  /** Optional element attributes. */
  attributes?: {};
  /** Child component(s) to render. */
  children: ReactElement | ReactNode;
  /** Optional classNames. */
  className?: string;
  /** Whether or not there should be a drop cap. */
  dropCap?: boolean;
  /** Optional element ID. */
  id?: string;
  /** Inline styles. */
  style?: {};
  /** The type of element to render. */
  tag: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

RichText.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  dropCap: PropTypes.bool,
  id: PropTypes.string,
  style: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
  }),
  tag: PropTypes.string,
};

RichText.defaultProps = {
  dropCap: false,
  tag: "div",
};