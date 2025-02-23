import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { create } from "zustand";

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
    <div className="overflow-x-auto py-2">
      <div className="flex gap-2 px-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          className="rounded-full min-w-[60px]"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? "default" : "outline"}
            size="sm"
            className="rounded-full min-w-[60px]"
            onClick={() => setSelectedCategory(category.name)}
            style={{
              backgroundColor: selectedCategory === category.name ? category.color : 'transparent',
              borderColor: category.color,
              color: selectedCategory === category.name ? 'white' : 'inherit',
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}