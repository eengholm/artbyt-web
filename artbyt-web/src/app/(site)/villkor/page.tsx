import { Metadata } from "next";
import { getTermsSettings } from "@/lib/api";
import { fillSellerPlaceholders } from "@/lib/legal";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "@/app/_components/shared/markdown-styles.module.css";
import { SiteFooter } from "@/app/_components/layout/site-footer";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title } = getTermsSettings();
  return { title };
}

export default async function TermsPage() {
  const { title, content } = getTermsSettings();
  const html = await markdownToHtml(fillSellerPlaceholders(content));

  return (
    <main>
      <hr className="border-t border-gray-200 mb-6" />
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div
        className={`max-w-2xl ${markdownStyles["markdown"]}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SiteFooter />
    </main>
  );
}
