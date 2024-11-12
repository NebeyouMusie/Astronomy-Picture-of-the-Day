import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { APODResponse, formatDate } from "@/lib/utils";

interface APODDialogProps {
  data: APODResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function APODDialog({ data, open, onOpenChange }: APODDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{formatDate(data.date)}</Badge>
            <Badge variant="secondary">{data.media_type}</Badge>
          </div>
          <DialogTitle className="text-2xl">{data.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              {data.media_type === "image" ? (
                <img
                  src={data.hdurl || data.url}
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
            <p className="text-foreground/80 leading-relaxed">
              {data.explanation}
            </p>
            {data.copyright && (
              <p className="text-sm text-muted-foreground">
                © {data.copyright}
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}