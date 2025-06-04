import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import Loading from "./Loading";

// ✅ Import Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose the weights you need
  variable: "--font-roboto", // Optional: if you want to use CSS variables
});

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "A invoice dashboard",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"} dir="ltr" className={roboto.className}>
      <body className="antialiased">
        <Suspense fallback={<Loading />}>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
