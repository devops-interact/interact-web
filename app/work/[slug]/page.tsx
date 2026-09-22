import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { getWorkBySlug, getWorkProjects } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getWorkProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return { title: "Work — Interact" };
  return {
    title: `${project.title} — Interact`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
