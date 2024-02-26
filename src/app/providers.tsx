"use client";

import { darkTheme } from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};
