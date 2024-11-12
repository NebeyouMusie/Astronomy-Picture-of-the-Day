import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { APODResponse, fetchAPOD } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APODCard } from "@/components/APODCard";
import { APODDialog } from "@/components/APODDialog";
import { SearchForm } from "@/components/SearchForm";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<APODResponse | null>(null);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["apod", searchParams],
    queryFn: () => fetchAPOD(searchParams),
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch APOD data. Please try again.",
    });
  }

  const images = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      <ThemeToggle />
      
      <div className="container max-w-7xl pt-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Astronomy Picture of the Day
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the cosmos! Each day a different image or photograph of our
              fascinating universe is featured, along with a brief explanation
              written by a professional astronomer.
            </p>
          </div>

          <SearchForm onSearch={setSearchParams} />

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <APODCard
                  key={image.date}
                  data={image}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <APODDialog
        data={selectedImage}
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      />
    </div>
  );
};

export default Index;