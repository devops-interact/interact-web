import { EditorialGrid, EditorialGridCard } from "@/components/ui/EditorialGridCard";
import { getSite } from "@/lib/content";

export function TestimonialStrip() {
  const items = getSite().testimonials.items;

  return (
    <EditorialGrid>
      {items.map((item) => {
        if (item.type === "tweet") {
          return (
            <EditorialGridCard
              key={`${item.handle}-${item.date}`}
              index={item.industry}
              body={item.text}
              title={item.name}
              footer={`${item.handle} · ${item.date}`}
            />
          );
        }

        return (
          <EditorialGridCard
            key={`${item.name}-${item.role}`}
            index={item.industry}
            body={item.text}
            title={item.name}
            footer={item.role}
          />
        );
      })}
    </EditorialGrid>
  );
}
