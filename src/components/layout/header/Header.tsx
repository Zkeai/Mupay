"use client";

import React, { useEffect, useState, useTransition } from "react";
import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import Icon from "@/components/custom/Icon";
import Style from "@/components/components.module.css";
import { useTranslations } from "next-intl";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LocaleSwitcher from "@/components/local-switcher/index";
import { usePathname, useRouter } from "@/i18n/routing";
//import { useAccount } from "wagmi";
import headerMap from "@/config/header.json";

interface SubMenuItem {
  name: string;
  path?: string;
  click?: boolean;
  icon?: string;
  item: SubMenuItem[];
}

interface MenuItem {
  name: string;
  path?: string;
  click?: boolean;
  icon?: string;
  item: SubMenuItem[];
}

const Header: React.FC = () => {
  const t = useTranslations("head"); // 使用 'head' 作为翻译文件的命名空间
  const router = useRouter();
  const pathname = usePathname();

  const translatedMap = {
    ...headerMap,
    item: headerMap.item.map((section) => ({
      ...section,
      name: t(section.name), // 翻译每个 section 名称
      item: section.item.map((subItem) => ({
        ...subItem,
        name: t(subItem.name), // 翻译每个子项名称
      })),
    })),
  };
  const [menu] = useState(translatedMap.item[0].item as MenuItem[]);
  const [mode, setMode] = useState(true);

  const [businessConfig, setBusinessConfig] = useState<{
    shop_name?: string;
  } | null>(null);

  const switchMode = () => {
    const body = document.body;

    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }

    setMode(!mode);
  };

  // const { address, isConnected } = useAccount(); 获取链接信息

  const titleClickHandle = () => {
    router.push("/");
  };

  useEffect(() => {
    // Check if running in client side before accessing localStorage
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("businessConfig");
      if (savedConfig) {
        setBusinessConfig(JSON.parse(savedConfig));
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="fixed  top-0 left-0 right-0 flex items-center shadow-md font-bold h-16 p-4 z-[9999] backdrop-blur">
      <div className="flex flex-none  lg:space-x-10  justify-center text-center">
        <Icon
          className={Style.headLeftIcon}
          type="icon-ciyuanxiaozhen"
          size={25}
        />
        <div className={Style.title} onClick={titleClickHandle}>
          <span className={Style.text}>
            {businessConfig?.shop_name || t("defaultName")}
          </span>
        </div>
      </div>
      <div className="flex-grow ml-8 flex md:justify-center">
        <nav>
          <ul className="flex lg:space-x-8 ">
            {menu.map((menuItem, index) => (
              <li key={index} className="relative group">
                <a
                  href={menuItem.path || "#"}
                  className="flex items-center px-2 py-1 rounded-lg text-lg hover:bg-amber-500 hover:text-white"
                >
                  {menuItem.icon && (
                    <span className={`iconfont ${menuItem.icon} mr-2`}></span>
                  )}
                  {menuItem.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={Style.mode}>
        <div className="flex space-x-5">
          <div className="mt-2" onClick={switchMode}>
            {mode ? (
              <IconMoon size="extra-large" style={{ color: "#848081" }} />
            ) : (
              <IconSun size="extra-large" style={{ color: "#f9f9f9" }} />
            )}
          </div>

          <LocaleSwitcher />
        </div>
      </div>
      <div className="relative w-1/4   flex-none flex pb-10 md:pb-13">
        <div className="absolute right-0">
          <ConnectButton
            label={t("Login")}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
