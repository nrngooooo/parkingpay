"use client";

import { ApolloWrapper } from "@/container/ApolloWrapper";
import MainLayout from "@/layouts/MainLayout";
import theme from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Layout = MainLayout;
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloWrapper>
            <Layout>{children}</Layout>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
