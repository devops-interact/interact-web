import Link from "next/link";

type Post = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  href: string;
  featured?: boolean;
};

export function InsightsGrid({ posts }: { posts: Post[] }) {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <div className="grid border border-[var(--border-panel)] lg:grid-cols-2">
      <Link
        href={featured.href}
        className="group flex flex-col border-b border-[var(--border-panel)] lg:border-b-0 lg:border-r"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-panel)] px-4 py-2 font-mono text-[10px] text-muted-panel">
          <span>{featured.category}</span>
          <span>// {featured.date}</span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-8">
          <div>
            <h3 className="text-2xl font-semibold group-hover:underline">
              {featured.title}
            </h3>
            <p className="mt-4 text-sm text-muted-panel">{featured.excerpt}</p>
          </div>
          <span className="mt-8 font-mono text-[10px] tracking-widest">READ MORE ↗</span>
        </div>
        <div className="h-48 bg-neutral-900" aria-hidden />
      </Link>
      <div className="flex flex-col">
        {rest.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className="group flex flex-1 border-b border-[var(--border-panel)] last:border-b-0"
          >
            <div className="flex flex-1 flex-col justify-center p-6">
              <p className="font-mono text-[10px] text-muted-panel">
                {post.category} // {post.date}
              </p>
              <h3 className="mt-2 font-medium group-hover:underline">{post.title}</h3>
              <span className="mt-4 font-mono text-[10px]">READ MORE ↗</span>
            </div>
            <div className="w-32 shrink-0 bg-neutral-200" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}
