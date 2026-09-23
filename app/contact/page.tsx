import { MailtoRedirect } from "@/components/layout/MailtoRedirect";
import { getContactMailto } from "@/lib/content";

export default function ContactPage() {
  return <MailtoRedirect href={getContactMailto()} />;
}
