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
    <html
      lang="ko"
      className="md:text-[17px] lg:text-[18px] xl:text-[19px] text-sugar-cane-950"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-[100vh] grid grid-rows-[auto,1fr,auto] bg-sugar-cane-50 box-border">
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
