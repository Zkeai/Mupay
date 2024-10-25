// hooks/useBusinessConfig.ts
"use client"
import { useEffect, useState } from "react";
import { getBuinessConfig } from "@/http/api/business/api";

export function useBusinessConfig() {
  const [businessConfig, setBusinessConfig] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("businessConfig");
      return savedConfig ? JSON.parse(savedConfig) : null;
    }
    return null;
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await getBuinessConfig();
        setBusinessConfig(response.data);
        localStorage.setItem("businessConfig", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch business config:", error);
      }
    };

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      fetchConfig();
    }
  }, []);

  useEffect(() => {
    if (businessConfig && businessConfig.title) {
      document.title = businessConfig.title;
    }
  }, [businessConfig]);

  return businessConfig;
}