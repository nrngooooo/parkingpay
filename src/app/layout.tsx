"use client";
import { ApolloWrapper } from "@/container/ApolloWrapper";
import MainLayout from "@/layouts/MainLayout";
import ThemeProviderWrapper from "./ThemeProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ApolloWrapper>
          <ThemeProviderWrapper>
            <MainLayout>{children}</MainLayout>
          </ThemeProviderWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
