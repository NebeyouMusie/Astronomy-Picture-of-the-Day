import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

interface SearchFormProps {
  onSearch: (params: Record<string, string>) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [date, setDate] = useState<Date>();
  const [count, setCount] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchType, setSearchType] = useState<"single" | "range" | "random">("single");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};

    switch (searchType) {
      case "single":
        if (date) {
          params.date = format(date, "yyyy-MM-dd");
        }
        break;
      case "range":
        if (startDate && endDate) {
          params.start_date = format(startDate, "yyyy-MM-dd");
          params.end_date = format(endDate, "yyyy-MM-dd");
        }
        break;
      case "random":
        if (count) {
          params.count = count;
        }
        break;
    }

    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Button
          type="button"
          variant={searchType === "single" ? "default" : "outline"}
          onClick={() => {
            setSearchType("single");
            setCount("");
            setStartDate(undefined);
            setEndDate(undefined);
          }}
        >
          Single Date
        </Button>
        <Button
          type="button"
          variant={searchType === "range" ? "default" : "outline"}
          onClick={() => {
            setSearchType("range");
            setCount("");
            setDate(undefined);
          }}
        >
          Date Range
        </Button>
        <Button
          type="button"
          variant={searchType === "random" ? "default" : "outline"}
          onClick={() => {
            setSearchType("random");
            setDate(undefined);
            setStartDate(undefined);
            setEndDate(undefined);
          }}
        >
          Random Images
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {searchType === "single" && (
          <div className="space-y-2">
            <Label>Specific Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {searchType === "random" && (
          <div className="space-y-2">
            <Label>Count (Random Images)</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Enter count"
            />
          </div>
        )}

        {searchType === "range" && (
          <>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        <Search className="mr-2 h-4 w-4" /> Search APOD
      </Button>
    </form>
  );
}