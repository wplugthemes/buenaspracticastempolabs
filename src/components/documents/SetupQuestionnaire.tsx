import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SetupFormData {
  processCode: string;
  reviewYear: string;
  companyName: string;
}

export const SetupQuestionnaire = ({
  onSubmit,
}: {
  onSubmit: (data: SetupFormData) => void;
}) => {
  const { register, handleSubmit, setValue } = useForm<SetupFormData>();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  React.useEffect(() => {
    setValue("reviewYear", currentYear.toString());
  }, [currentYear, setValue]);

  return (
    <Card className="p-6 w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label>Process Code</Label>
          <Input
            {...register("processCode")}
            placeholder="Enter process code"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Document Review Year</Label>
          <Select
            {...register("reviewYear")}
            defaultValue={currentYear.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input
            {...register("companyName")}
            placeholder="Enter company name"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Card>
  );
};
