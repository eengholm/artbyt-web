import { Metadata } from "next";
import { getPrivacySettings } from "@/lib/api";
import { fillSellerPlaceholders } from "@/lib/legal";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "@/app/_components/shared/markdown-styles.module.css";
import { PageShell } from "@/app/_components/layout/page-shell";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title } = getPrivacySettings();
  return { title };
}

export default async function PrivacyPage() {
  const { title, content } = getPrivacySettings();
  const html = await markdownToHtml(fillSellerPlaceholders(content));

  return (
    <PageShell mainClassName="md:pl-36">
      <hr className="border-t border-gray-200 mb-6" />
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div
        className={`max-w-2xl ${markdownStyles["markdown"]}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </PageShell>
  );
}
