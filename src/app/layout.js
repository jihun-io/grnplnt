import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { data } from "./social/page";

import { generateMetadata } from "../../utils/metadata";

export const metadata = generateMetadata();

const socialLastDate = data
  .map((item) => new Date(item.date))
  .sort()
  .reverse()[0];

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className=" text-sugar-cane-950">
      <head></head>
      <body className="min-h-[100vh] grid grid-rows-[auto,1fr,auto] bg-sugar-cane-50 box-border overflow-x-hidden">
        <Header
          title={metadata.title}
          className="sticky top-0 z-50 bg-sugar-cane-50"
          socialLastDate={socialLastDate}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
