import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { strDateFormat } from "@/utils/utils";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreateTaskDto, TaskPriority, TaskT } from "@shared/dtos";
import { BarChart, CalendarIcon } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface TaskFormProps {
  task?: TaskT;
  listId: number;
  onSubmit: (data: CreateTaskDto) => void;
}

export function TaskForm({ listId, onSubmit }: TaskFormProps) {
  const form = useForm<CreateTaskDto>({
    resolver: classValidatorResolver(CreateTaskDto),
    defaultValues: {
      name: "",
      description: "",
      listId,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormName form={form} />
        <FormDate form={form} />
        <FormPriority form={form} />
        <FormDescription form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const FormName = ({ form }: { form: UseFormReturn<CreateTaskDto> }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="pt-5">
          <Input
            className="text-2xl font-semibold tracking-tight pl-0"
            placeholder="Name"
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormDate = ({ form }: { form: UseFormReturn<CreateTaskDto> }) => {
  return (
    <FormField
      control={form.control}
      name="dueDate"
      render={({ field }) => (
        <FormItem className="flex items-baseline">
          <FormLabel className="flex gap-3 min-w-[150px] max-w-[150px]">
            <CalendarIcon className="h-4 w-4 opacity-50" />
            Due date
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    strDateFormat(field.value)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value || "")}
                onSelect={(event) => field.onChange(event?.toISOString())}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormPriority = ({ form }: { form: UseFormReturn<CreateTaskDto> }) => {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="flex gap-3 max-w-[150px] min-w-[150px] items-center">
            <BarChart />
            Priority
          </FormLabel>
          <Select {...field} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(TaskPriority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority.toLocaleLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

const FormDescription = ({ form }: { form: UseFormReturn<CreateTaskDto> }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="pt-5">
          <FormLabel className="text-2xl font-semibold tracking-tight">
            Description
          </FormLabel>
          <Textarea placeholder="Description" {...field} rows={3} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
