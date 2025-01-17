/**
 * Internal dependencies
 */
import { WithGlobalCSS } from "./decorators/with-global-css";

/**
 * Import application global styles/CSS framework below.
 */

export const globalTypes = {
  css: {
    name: "Global CSS",
    description: "Inject global CSS that may be loaded in certain contexts.",
    defaultValue: "shared",
    toolbar: {
      icon: "document",
      items: [
        { value: "shared", title: "Shared Styles" },
        { value: "antLight", title: "Ant-Light theme" },
        { value: "antDark", title: "Ant-Dark theme" },
        { value: "atomic", title: "Atomic Styles" },
        {
          value: "gutenberg",
          title: "Gutenberg Styles",
        },
      ],
    },
  },
};


export const decorators = [WithGlobalCSS];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  storySort: {
    // @TODO: Look into this, doesn't appear it's working
    order: [
      "Atomic Design",
      ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
      "Ant Design",
      [
        "Components",
        [
          "General",
          [
            "Button",
            "Typography",
            ["Typography", "Text", "Title", "Paragraph"],
          ],
        ],
      ],
      "Drupal",
      "WordPress",
    ],
  },
};
