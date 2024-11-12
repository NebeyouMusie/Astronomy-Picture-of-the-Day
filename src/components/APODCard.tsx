import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APODResponse, formatDate } from "@/lib/utils";

interface APODCardProps {
  data: APODResponse;
  onClick?: () => void;
}

export function APODCard({ data, onClick }: APODCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all hover:scale-[1.02] cursor-pointer bg-background/60 backdrop-blur-sm border-2"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden">
        {data.media_type === "image" ? (
          <img
            src={data.url}
            alt={data.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <iframe
            src={data.url}
            title={data.title}
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{formatDate(data.date)}</Badge>
          <Badge variant="secondary">{data.media_type}</Badge>
        </div>
        <CardTitle className="line-clamp-2">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{data.explanation}</p>
      </CardContent>
    </Card>
  );
}