import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="mt-16">
      <h1>{t("title")}</h1>
      <p>
        <Link href="/about" className="underline">
          {t("about")}
        </Link>
      </p>
      <p>
        <Link href="/blog/100" className="underline">
          {t("blog1")}
        </Link>
      </p>
    </div>
  );
}
