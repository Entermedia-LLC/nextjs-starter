// Import React.js dependencies
import { ReactElement, ReactNode } from "react";

/**
 * Import application global styles/CSS framework below.
 */

/**
 * Entermedia's minimal CSS framework
 * @see https://github.com/Entermedia-LLC/scss
 */
import "normalize.css/normalize.css";
import "@/theme/base.scss";
import "@/theme/themes/default.scss";

// Import component dependencies
import Page from "@/components/templates/Page";

export default function RootLayout({
  children,
}: {
  children: ReactElement | ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* @TODO: See https://github.com/vercel/next.js/issues/42292#issuecomment-1298459024 */}
        {/* @ts-expect-error Server Component */}
        <Page>{children}</Page>
      </body>
    </html>
  );
}
