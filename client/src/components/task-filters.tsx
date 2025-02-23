import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { create } from "zustand";
import { CreateCategoryButton } from "./category-form";

interface FilterState {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export function TaskFilters() {
  const { selectedCategory, setSelectedCategory } = useFilterStore();
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Categories</h2>
        <CreateCategoryButton />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          className={selectedCategory === null ? "" : "text-muted-foreground hover:text-foreground"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className={selectedCategory === category.name ? "" : "text-muted-foreground hover:text-foreground"}
            onClick={() => setSelectedCategory(category.name)}
            style={{
              "--category-color": category.color,
            } as React.CSSProperties}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}