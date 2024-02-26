import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "When does it get 💩?",
  description: "Find out when your favorite TV show gets 💩!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
