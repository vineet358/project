'use client';

import { usePathname } from "next/navigation";
import Header from "./layout/header";
import Footer from "./layout/footer";
import FloatingActionButton from "../components/FloatingActionButton";
import { useRouter } from "next/navigation";
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const router = useRouter();
  const isWriteBlogPage = pathname ==="/write-blog";
  const handleWriteClick = () => {
    // Navigate to blog writing page or open a modal
    router.push('/write-blog');
  };

  return (
    <>
      {!isLandingPage && <Header />}
      {children}
      {!isLandingPage && <Footer />}
      {!isWriteBlogPage && <FloatingActionButton
        label="Write Blog"
        onClick={handleWriteClick}
      />}
    </>
  );
}
