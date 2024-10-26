import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="mt-16">
      <h1>{t("title1")}</h1>
    </div>
  );
}
