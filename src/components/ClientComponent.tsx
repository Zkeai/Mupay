// components/ClientComponent.tsx
"use client";

//import { useBusinessConfig } from "@/hooks/useBusinessConfig";
import { Providers } from "@/context/providers";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/layout/header/Header"), {
  ssr: false, // 如果希望只在客户端渲染
});
export default function ClientComponent() {
  //const businessConfig = useBusinessConfig();

  return (
    <>
      <Providers>
        <header>
          <Header />
        </header>
      </Providers>
    </>
  );
}
