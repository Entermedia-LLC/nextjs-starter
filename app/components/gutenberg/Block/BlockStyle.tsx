/**
 * Import external dependencies
 */
import cn from "classnames";

/**
 * Import internal functions
 */
import generateStyles from "@/functions/gutenberg/generateStyles";

// Screen size
// @TODO: Convert these to be dynamic, pulled from @antd
export const screens: { [key: string]: { antdToken: string } } = {
  xs: {
    antdToken: "screenXS",
  },
  sm: {
    antdToken: "screenSM",
  },
  md: {
    antdToken: "screenMD",
  },
  lg: {
    antdToken: "screenLG",
  },
  xl: {
    antdToken: "screenXL",
  },
  xxl: {
    antdToken: "screenXXL",
  },
};

interface BlockStyleProps {
  className: string;
  // @TODO: Needs to be properly scoped
  block: any;
  // @TODO: Needs to be a more specific type
  token: Object;
  Component: ({ className }: { className: string }) => JSX.Element;
}

export const BlockStyle = ({
  className,
  block,
  token,
  Component,
}: BlockStyleProps) => {
  const classNames = [className];

  // Handle visibility
  if (block?.attributes?.visibility) {
    for (const [screenSize] of Object.entries(screens)) {
      if (!block.attributes.visibility.includes(screenSize)) {
        classNames.push(`gutenberg-ant-design-${screenSize}-hide`);
      }
    }
  }

  return (
    <>
      <Component className={cn(classNames)} />
      <style jsx>{`
        .${className} {
          ${generateStyles(block, "xs")}
          ${extractStyles(block?.attributes?.styles?.xs?.custom)}
        }

        @media (min-width: ${token[
          screens.sm.antdToken as keyof typeof token
        ]}px) {
          .${className} {
            ${generateStyles(block, "sm")}
            ${extractStyles(block?.attributes?.styles?.sm?.custom)}
          }
        }

        @media (min-width: ${token[
            screens.md.antdToken as keyof typeof token
          ]}px) {
          .${className} {
            ${generateStyles(block, "md")}
            ${extractStyles(block?.attributes?.styles?.md?.custom)}
          }
        }

        @media (min-width: ${token[
            screens.lg.antdToken as keyof typeof token
          ]}px) {
          .${className} {
            ${generateStyles(block, "lg")}
            ${extractStyles(block?.attributes?.styles?.lg?.custom)}
          }
        }

        @media (min-width: ${token[
            screens.xl.antdToken as keyof typeof token
          ]}px) {
          .${className} {
            ${generateStyles(block, "xl")}
            ${extractStyles(block?.attributes?.styles?.xl?.custom)}
          }
        }

        @media (min-width: ${token[
            screens.xxl.antdToken as keyof typeof token
          ]}px) {
          .${className} {
            ${generateStyles(block, "xxl")}
            ${extractStyles(block?.attributes?.styles?.xxl?.custom)}
          }
        }
      `}</style>
    </>
  );
};


// Extract custom styles from a string
const extractStyles = (styles: string) => {
    const regex = /selector\s*{([^}]*)}/g;
    
    const style = styles?.length
      ? styles.replace(regex, "$1")
      : ``
    return style;
}
