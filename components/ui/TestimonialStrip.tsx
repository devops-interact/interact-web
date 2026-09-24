import { EditorialGrid, EditorialGridCard } from "@/components/ui/EditorialGridCard";
import { getSite } from "@/lib/content";

function testimonialIndex(i: number) {
  return String(i + 1).padStart(3, "0");
}

export function TestimonialStrip() {
  const items = getSite().testimonials.items;

  return (
    <EditorialGrid>
      {items.map((item, i) => {
        if (item.type === "tweet") {
          return (
            <EditorialGridCard
              key={`${item.handle}-${item.date}`}
              index={testimonialIndex(i)}
              body={item.text}
              title={item.name}
              footer={`${item.handle} · ${item.date}`}
              position={i}
            />
          );
        }

        return (
          <EditorialGridCard
            key={`${item.name}-${item.role}`}
            index={testimonialIndex(i)}
            body={item.text}
            title={item.name}
            footer={item.role}
            position={i}
          />
        );
      })}
    </EditorialGrid>
  );
}
