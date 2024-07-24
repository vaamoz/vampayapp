import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "@/containers/sidebar/sidebar";
import Header from "@/containers/header/header";
import { ThemeProvider } from "next-themes";
import MaterialThemeProvider from "@/context/themeContext";
import { Provider } from "react-redux";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Vampay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider>
            <MaterialThemeProvider>
              <div className="p-4 flex flex-col gap-4 w-full bg-background ">
                <Header />
                <div className="flex justify-start gap-4 h-[85vh]  ">
                  <Sidebar />
                  <div className="w-full overflow-auto h-[85vh] bg-background showScrollbar">
                    {children}
                  </div>
                </div>
              </div>
            </MaterialThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
