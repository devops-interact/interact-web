import site from "@/content/site.json";
import workData from "@/content/work.json";
import faqData from "@/content/faq.json";
import insightsData from "@/content/insights.json";

export type WorkProject = (typeof workData.projects)[number];

export function getSite() {
  return site;
}

export function getWorkProjects(): WorkProject[] {
  return workData.projects;
}

export function getWorkBySlug(slug: string): WorkProject | undefined {
  return workData.projects.find((p) => p.slug === slug);
}

export function getFaq() {
  return faqData.items;
}

export function getInsights() {
  return insightsData.posts;
}
