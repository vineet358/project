'use client';

import { usePathname } from "next/navigation";
import Header from "./layout/header";
import Footer from "./layout/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <>
      {!isLandingPage && <Header />}
      {children}
      {!isLandingPage && <Footer />}
    </>
  );
}
