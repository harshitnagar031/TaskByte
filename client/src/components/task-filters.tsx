import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";

export function TaskFilters() {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" className="text-primary">All</Button>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          className="text-muted-foreground hover:text-foreground"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
