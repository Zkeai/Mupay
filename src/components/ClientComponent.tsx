// components/ClientComponent.tsx
"use client";

//import { useBusinessConfig } from "@/hooks/useBusinessConfig";
import { useEffect } from "react";
import Header from "@/components/layout/header/Header";
import { Providers } from "@/context/providers";
import "@rainbow-me/rainbowkit/styles.css";

export default function ClientComponent() {
  //const businessConfig = useBusinessConfig();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/iconfont.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
