import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const suggestions = [
  "Complete project presentation",
  "Schedule team meeting",
  "Review monthly goals",
  "Update task documentation"
];

export function TaskSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {suggestions.map((suggestion, i) => (
            <Button
              key={i}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement suggestion click
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              {suggestion}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
