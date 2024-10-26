"use client";

import React, { useEffect, useState } from "react";
import { IconMoon, IconSun, IconAscend } from "@douyinfe/semi-icons";
import Icon from "@/components/custom/Icon";
import Style from "@/components/components.module.css";
import { useTranslations } from "next-intl";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LocaleSwitcher from "@/components/local-switcher/index";
import { usePathname, useRouter } from "@/i18n/routing";
import headerMap from "@/config/header.json";

interface SubMenuItem {
  name: string;
  path?: string;
  click?: boolean;
  icon?: string;
  item?: SubMenuItem[];
}

interface MenuItem {
  name: string;
  path?: string;
  click?: boolean;
  icon?: string;
  item?: SubMenuItem[];
}

const Header: React.FC = () => {
  const t = useTranslations("head");
  const router = useRouter();
  const pathname = usePathname();

  const translatedMap = headerMap.item
    ? {
        ...headerMap,
        item: headerMap.item.map((section) => ({
          ...section,
          name: t(section.name),
          item: section.item.map((subItem) => ({
            ...subItem,
            name: t(subItem.name),
          })),
        })),
      }
    : { item: [] };

  const [menu] = useState<MenuItem[]>(translatedMap.item[0]?.item || []);
  const [mode, setMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单开关

  const [businessConfig, setBusinessConfig] = useState<{
    shop_name?: string;
  } | null>(null);

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setMode(true);
    } else {
      body.setAttribute("theme-mode", "dark");
      setMode(false);
    }
  };

  const titleClickHandle = () => {
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("businessConfig");
      if (savedConfig) {
        setBusinessConfig(JSON.parse(savedConfig));
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center shadow-md font-bold h-16 p-4 z-[9999] backdrop-blur">
      <div className="flex items-center justify-between w-full">
        {/* Logo 和标题 */}
        <div className="hidden lg:flex items-center space-x-3">
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

        {/* 汉堡菜单按钮，用于移动端 */}
        <div className="lg:hidden flex items-center">
          <IconAscend
            size="extra-large"
            style={{ color: "#848081" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer"
          />
        </div>

        {/* 导航菜单 - 桌面视图显示，移动端隐藏 */}
        <nav className="hidden lg:flex flex-grow ml-8 md:justify-center">
          <ul className="flex lg:space-x-8">
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

        {/* 主题切换和语言选择 */}
        <div className="flex items-center space-x-2">
          <div onClick={switchMode} className="cursor-pointer mt-1">
            {mode ? (
              <IconMoon size="extra-large" style={{ color: "#848081" }} />
            ) : (
              <IconSun size="extra-large" style={{ color: "#f9f9f9" }} />
            )}
          </div>
          <LocaleSwitcher />
        </div>

        {/* 登录按钮 */}
        <div className="relative">
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

        {/* 折叠导航菜单 - 仅在移动端显示 */}
        {isMenuOpen && (
          <div className="lg:hidden ">
            <nav>
              <ul className="flex ">
                {menu.map((menuItem, index) => (
                  <li key={index}>
                    <a
                      href={menuItem.path || "#"}
                      className="block  py-1 rounded-lg text-[10px] hover:bg-amber-500 hover:text-white"
                    >
                      {menuItem.icon && (
                        <span
                          className={`iconfont ${menuItem.icon} mr-4`}
                        ></span>
                      )}
                      {menuItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
